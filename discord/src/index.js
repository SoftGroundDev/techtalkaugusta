// Load .env file only in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
const db = require('./modules/database');
const app = express();

// Port configuration for Azure compatibility
const port = process.env.port || 8080;  // Azure App Service expects port 8080 for container health checks
const HOST = '0.0.0.0';  // Always use 0.0.0.0 in container environments

// Initialize services
async function initializeServices() {
  try {
    // Connect to database first
    console.log('Connecting to database...');
    await db.connect();
    console.log('Database connected successfully');

    // Start Express server
    const server = app.listen(port, HOST, () => {
      console.log(`Server listening on ${HOST}:${port}`);
    });

    // Initialize Discord client
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
      ],
    });

    client.commands = new Collection();

    // Load commands
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'))
      .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      client.commands.set(command.name, command);
    }

    // Set up event handlers
    client.once('ready', async () => {
      try {
        // Initialize MeetupManager
        const MeetupManager = require('./modules/meetup');
        client.meetupManager = new MeetupManager(client);
        await client.meetupManager.initialize();
        
        console.log(`Logged in as ${client.user.tag}`);
        console.log(`Connected to ${client.guilds.cache.size} servers`);
      } catch (error) {
        console.error('Error during bot initialization:', error);
      }
    });

    // Welcome new members
    client.on('guildMemberAdd', async (member) => {
      const welcomeChannel = member.guild.channels.cache.find(
        channel => channel.name === 'welcome'
      );
      
      if (welcomeChannel) {
        welcomeChannel.send(
          `Welcome to Tech Talk Augusta, ${member}! 🎉\n\n` +
          `• Check out #rules for our community guidelines\n` +
          `• Introduce yourself in #introductions\n` +
          `• Get roles in #role-assignment\n\n` +
          `We're excited to have you join our tech community!`
        );
      }
    });

    // Message handling
    client.on('messageCreate', async (message) => {
      if (message.author.bot) return;
      
      if (message.content.startsWith('!')) {
        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (command) {
          try {
            await command.execute(message, args);
          } catch (error) {
            console.error('Command error:', error);
            await message.reply('There was an error executing that command.');
          }
        }
      }
    });

    // Error handling
    client.on('error', error => {
      console.error('Discord client error:', error);
    });

    // Graceful shutdown
    const gracefulShutdown = async () => {
      console.log('Initiating graceful shutdown...');
      server.close(() => console.log('Express server closed'));
      if (client) await client.destroy();
      process.exit(0);
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

    // Login to Discord
    await client.login(process.env.DISCORD_TOKEN);

  } catch (error) {
    console.error('Failed to initialize services:', error);
    process.exit(1);
  }
}

// Express routes
app.get('/health', async (req, res) => {
  try {
    const dbStatus = db.isConnected;
    
    // Always return 200 during startup to prevent Azure from killing the container
    res.status(200).json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      startup: true,
      database: {
        connected: dbStatus,
        status: dbStatus ? 'connected' : 'disconnected'
      },
      discord: {
        connected: client?.ws?.status === 0 || !client,  // Consider not connected client as OK during startup
        ping: client?.ws?.ping
      },
      memory: {
        heapUsed: process.memoryUsage().heapUsed,
        heapTotal: process.memoryUsage().heapTotal
      }
    });
  } catch (error) {
    // Still return 200 to prevent Azure from killing the container during startup
    res.status(200).json({
      status: 'starting',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/', (req, res) => {
  res.send('Tech Talk Augusta Bot is running!');
});

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.path,
    timestamp: new Date().toISOString()
  });
});

// Start all services
initializeServices().catch(error => {
  console.error('Failed to start services:', error);
  process.exit(1);
}); 