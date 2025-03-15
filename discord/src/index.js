require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// Port configuration for Azure compatibility
const PORT = process.env.PORT || process.env.WEBSITES_PORT || 8080;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

// Simple health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbStatus = client.meetupManager ? await client.meetupManager.isDbConnected() : false;
    
    res.status(200).json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: {
        connected: dbStatus,
        status: dbStatus ? 'connected' : 'disconnected'
      },
      discord: {
        connected: client.ws.status === 0,
        ping: client.ws.ping
      },
      memory: {
        heapUsed: process.memoryUsage().heapUsed,
        heapTotal: process.memoryUsage().heapTotal
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/', (req, res) => {
  res.send('Tech Talk Augusta Bot is running!');
});

// Start Express server
const server = app.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});

// Graceful shutdown handler
const gracefulShutdown = async () => {
  console.log('Initiating graceful shutdown...');
  server.close(() => console.log('Express server closed'));
  if (client) await client.destroy();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

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

// Bot ready event
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Connected to ${client.guilds.cache.size} servers`);
});

// Basic error handling
client.on('error', error => {
  console.error('Discord client error:', error);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN); 