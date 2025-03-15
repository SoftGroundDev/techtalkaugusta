require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const MeetupManager = require('./modules/meetup');
const db = require('./modules/database');
const fs = require('fs');
const path = require('path');

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
      return;
    }

    // Legacy command handling
    switch (commandName) {
      case 'help':
        message.reply(
          '**Tech Talk Augusta Bot Commands:**\n' +
          '`!meetup schedule` - View upcoming meetups\n' +
          '`!meetup create` - Create a new meetup\n' +
          '`!meetup rsvp` - RSVP to a meetup\n' +
          '`!meetup cancel` - Cancel a meetup\n' +
          '`!suggest` - Suggest a meetup topic\n' +
          '`!resources` - Share or view tech resources\n' +
          '`!poll` - Create a poll (admin only)\n'
        );
        break;
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
    await db.connect();
    console.log('Database connection established');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }

  // Initialize meetup schedule
  try {
    await client.meetupManager.updateScheduleMessage();
    console.log('Meetup schedule initialized');
  } catch (error) {
    console.error('Failed to initialize meetup schedule:', error);
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

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT signal...');
  console.log('Cleaning up connections...');
  try {
    await db.disconnect();
    console.log('Database disconnected');
    await client.destroy();
    console.log('Discord client destroyed');
    console.log('Shutdown complete');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Login to Discord with enhanced error handling
console.log('Attempting to connect to Discord...');
client.login(process.env.DISCORD_TOKEN).catch(error => {
  console.error('Failed to login to Discord:', error);
  console.error('Token used:', process.env.DISCORD_TOKEN ? '[Token present]' : '[No token found]');
  process.exit(1);
}); 