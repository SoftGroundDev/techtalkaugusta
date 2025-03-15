require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const MeetupManager = require('./modules/meetup');
const db = require('./modules/database');
const uptimeRobot = require('./modules/uptimerobot');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Express health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('Tech Talk Augusta Bot is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Start Express server with error handling
const server = app.listen(PORT, () => {
  console.log(`Health check server listening on port ${PORT}`);
}).on('error', (error) => {
  console.error('Express server error:', error);
});

// Graceful shutdown handler
const gracefulShutdown = async () => {
  console.log('Initiating graceful shutdown...');
  
  // Close Express server
  server.close(() => {
    console.log('Express server closed');
  });

  // Close database connection
  try {
    await db.disconnect();
    console.log('Database disconnected');
  } catch (error) {
    console.error('Error disconnecting from database:', error);
  }

  // Destroy Discord client
  try {
    await client.destroy();
    console.log('Discord client destroyed');
  } catch (error) {
    console.error('Error destroying Discord client:', error);
  }

  // Exit process
  process.exit(0);
};

// Handle shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Memory usage monitoring
const logMemoryUsage = () => {
  const used = process.memoryUsage();
  console.log('Memory Usage:');
  for (let key in used) {
    console.log(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
};

// Log memory usage every 5 minutes
setInterval(logMemoryUsage, 5 * 60 * 1000);
// Initial memory usage log
logMemoryUsage();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.meetupManager = new MeetupManager(client);

// Load commands
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'))
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

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
        console.error(error);
        await message.reply('There was an error executing that command.');
      }
    }
  }
});

// Bot ready event
client.once('ready', async () => {
  console.log(`Bot is starting up...`);
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Bot ID: ${client.user.id}`);
  console.log(`Connected to ${client.guilds.cache.size} servers`);
  
  // Connect to database
  try {
    const dbOptions = {
      ssl: process.env.NODE_ENV === 'production',
      sslValidate: false, // Disable SSL certificate validation in production
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      maxPoolSize: 10,
      minPoolSize: 0
    };
    
    console.log('Attempting to connect to MongoDB with options:', JSON.stringify(dbOptions, null, 2));
    await db.connect(dbOptions);
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Failed to connect to database:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    // Don't exit the process, allow the bot to run without DB if needed
  }

  // Initialize meetup schedule
  try {
    await client.meetupManager.updateScheduleMessage();
    console.log('Meetup schedule initialized');
  } catch (error) {
    console.error('Failed to initialize meetup schedule:', error);
  }

  // Initialize status monitoring
  try {
    await uptimeRobot.updateStatusMessage(client);
    console.log('Status monitoring initialized');

    // Set up automatic status updates every 5 minutes
    setInterval(async () => {
      try {
        await uptimeRobot.updateStatusMessage(client);
        console.log('Status monitoring updated');
      } catch (error) {
        console.error('Failed to update status monitoring:', error);
      }
    }, 5 * 60 * 1000); // 5 minutes
  } catch (error) {
    console.error('Failed to initialize status monitoring:', error);
  }

  console.log('Bot is now fully ready!');
});

// Add reconnection handling
client.on('disconnect', (event) => {
  console.log(`Bot disconnected from Discord gateway with code ${event.code}`);
});

client.on('reconnecting', () => {
  console.log('Bot is attempting to reconnect to Discord gateway...');
});

client.on('resume', (replayed) => {
  console.log(`Bot reconnected to Discord gateway! Replayed ${replayed} events.`);
});

// Enhanced error handling
client.on('error', error => {
  console.error('Discord client error:', error);
  console.error('Error stack trace:', error.stack);
});

client.on('warn', info => {
  console.warn('Discord client warning:', info);
});

client.on('debug', info => {
  if (process.env.NODE_ENV === 'development') {
    console.debug('Discord debug:', info);
  }
});

process.on('unhandledRejection', (error, promise) => {
  console.error('Unhandled promise rejection:', error);
  console.error('Promise:', promise);
  console.error('Stack trace:', error.stack);
});

// Login to Discord with enhanced error handling
console.log('Attempting to connect to Discord...');
client.login(process.env.DISCORD_TOKEN).catch(error => {
  console.error('Failed to login to Discord:', error);
  console.error('Token used:', process.env.DISCORD_TOKEN ? '[Token present]' : '[No token found]');
  process.exit(1);
}); 