const { EmbedBuilder } = require('discord.js');
const { createHelpEmbed } = require('../utils/helpFormatter');

module.exports = {
    name: 'help',
    description: 'Display all available commands',
    async execute(message, args) {
        if (args[0]) {
            const command = message.client.commands.get(args[0].toLowerCase());
            if (command) {
                await message.reply(`Use \`!${command.name} help\` to see detailed help for that command.`);
                return;
            }
        }

        const helpEmbed = createHelpEmbed({
            title: 'Tech Talk Augusta Bot Commands',
            description: 'Here are all available commands. Type `!<command> help` for detailed help with any command.',
            commands: [
                { name: '📅 Meetup Management', value: 
                    `\`!meetup schedule\` - View upcoming meetups
\`!meetup create "Title" "YYYY-MM-DD" "HH:MM" "Location" "Topic" "Speaker"\` - Create a new meetup (Admin)
\`!meetup link <eventbrite_id>\` - Link existing Eventbrite event (Admin)
\`!meetup cancel <meetup_id>\` - Cancel a meetup (Admin)`
                },
                { name: '👥 RSVP Commands', value:
                    `\`!meetup rsvp <meetup_id> yes\` - Confirm attendance
\`!meetup rsvp <meetup_id> no\` - Decline attendance
\`!meetup rsvp <meetup_id> maybe\` - Maybe attending`
                },
                { name: '🔧 Utility Commands', value:
                    `\`!help\` - Show this help message
\`!ping\` - Check bot's response time
\`!status\` - View bot's status and health`
                }
            ],
            examples: [
                { 
                    name: '!help', 
                    value: 'Show this help message' 
                },
                { 
                    name: '!help ping', 
                    value: 'Get help with the ping command' 
                },
                { 
                    name: '!ping help', 
                    value: 'Get detailed help with the ping command' 
                }
            ]
        });

        await message.reply({ embeds: [helpEmbed] });
    }
}; 