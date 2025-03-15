const mongoose = require('mongoose');

class DatabaseManager {
    constructor() {
        this.isConnected = false;
        this.connectionRetries = 0;
        this.maxRetries = 5;
        this.retryDelay = 5000; // 5 seconds
    }

    async connect() {
        try {
            if (!process.env.MONGODB_URI) {
                throw new Error('MongoDB URI not found in environment variables');
            }

            // Configure mongoose
            mongoose.set('strictQuery', false);
            
            // Add connection options
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 10000, // Increased timeout
                socketTimeoutMS: 45000,
                family: 4, // Use IPv4, skip trying IPv6
                ssl: true,
                sslValidate: true,
                retryWrites: true,
                w: 'majority',
                maxPoolSize: 10,
                minPoolSize: 1,
                maxIdleTimeMS: 30000,
                connectTimeoutMS: 10000
            };

            // Connect with retry logic
            while (this.connectionRetries < this.maxRetries) {
                try {
                    await mongoose.connect(process.env.MONGODB_URI, options);
                    this.isConnected = true;
                    this.connectionRetries = 0;
                    console.log('Connected to MongoDB successfully');
                    break;
                } catch (error) {
                    this.connectionRetries++;
                    console.error(`MongoDB connection attempt ${this.connectionRetries} failed:`, error.message);
                    
                    if (this.connectionRetries === this.maxRetries) {
                        throw new Error(`Failed to connect after ${this.maxRetries} attempts`);
                    }
                    
                    console.log(`Retrying in ${this.retryDelay/1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                }
            }

            // Handle connection events
            mongoose.connection.on('error', (error) => {
                console.error('MongoDB connection error:', error);
                this.isConnected = false;
                this.attemptReconnect();
            });

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected');
                this.isConnected = false;
                this.attemptReconnect();
            });

            mongoose.connection.on('connected', () => {
                console.log('MongoDB connected');
                this.isConnected = true;
            });

            // Create schemas and models
            await this.initializeModels();

        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            this.isConnected = false;
            throw error;
        }
    }

    async attemptReconnect() {
        if (!this.isConnected && this.connectionRetries < this.maxRetries) {
            console.log('Attempting to reconnect to MongoDB...');
            try {
                await this.connect();
            } catch (error) {
                console.error('Reconnection attempt failed:', error);
            }
        }
    }

    async initializeModels() {
        // Meetup Schema
        const meetupSchema = new mongoose.Schema({
            id: String,
            title: String,
            date: Date,
            time: String,
            location: String,
            topic: String,
            speaker: String,
            description: String,
            attendees: [String],
            maybes: [String],
            declined: [String],
            created: Date,
            lastUpdated: Date,
            eventbriteId: String,
            eventbriteUrl: String,
            eventbriteSynced: {
                type: Boolean,
                default: false
            }
        });

        // Resource Schema
        const resourceSchema = new mongoose.Schema({
            title: String,
            type: String,
            topic: String,
            url: String,
            description: String,
            sharedBy: String,
            sharedDate: Date,
            likes: Number,
            tags: [String]
        });

        // User Schema
        const userSchema = new mongoose.Schema({
            discordId: String,
            roles: [String],
            joinDate: Date,
            presentationCount: Number,
            attendanceCount: Number,
            lastActive: Date
        });

        // Create models if they don't exist
        try {
            this.models = {
                Meetup: mongoose.models.Meetup || mongoose.model('Meetup', meetupSchema),
                Resource: mongoose.models.Resource || mongoose.model('Resource', resourceSchema),
                User: mongoose.models.User || mongoose.model('User', userSchema)
            };
            console.log('Models initialized successfully');
        } catch (error) {
            console.error('Error initializing models:', error);
            throw error;
        }
    }

    getModel(modelName) {
        if (!this.models || !this.models[modelName]) {
            throw new Error(`Model ${modelName} not initialized. Please ensure database is connected.`);
        }
        return this.models[modelName];
    }

    async disconnect() {
        if (this.isConnected) {
            await mongoose.disconnect();
            this.isConnected = false;
            console.log('Disconnected from MongoDB');
        }
    }
}

module.exports = new DatabaseManager(); 