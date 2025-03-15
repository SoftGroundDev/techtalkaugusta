require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const MeetupManager = require('./modules/meetup');
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
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  // Initialize meetup schedule
  client.meetupManager.updateScheduleMessage().catch(console.error);
});

// Error handling
client.on('error', error => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN); 