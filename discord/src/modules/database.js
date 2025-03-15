const mongoose = require('mongoose');

class DatabaseManager {
    constructor() {
        this.isConnected = false;
    }

    async connect() {
        try {
            if (!process.env.MONGODB_URI) {
                throw new Error('MongoDB URI not found in environment variables');
            }

            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            this.isConnected = true;
            console.log('Connected to MongoDB successfully');

            // Handle connection errors
            mongoose.connection.on('error', (error) => {
                console.error('MongoDB connection error:', error);
                this.isConnected = false;
            });

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected');
                this.isConnected = false;
            });

            // Create schemas and models
            await this.initializeModels();

        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
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
        mongoose.models.Meetup || mongoose.model('Meetup', meetupSchema);
        mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
        mongoose.models.User || mongoose.model('User', userSchema);
    }

    getModel(modelName) {
        return mongoose.models[modelName];
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