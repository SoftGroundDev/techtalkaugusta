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
            description: 'Welcome to the Tech Talk Augusta Bot! Below are all available commands. Each command has its own detailed help message that you can access using `!<command> help`.',
            emoji: '🔍',
            commands: [
                // Meetup Management Commands (Admin)
                { 
                    name: '!meetup create', 
                    value: 'Create a new meetup event',
                    admin: true
                },
                { 
                    name: '!meetup link', 
                    value: 'Link an Eventbrite event',
                    admin: true
                },
                { 
                    name: '!meetup cancel', 
                    value: 'Cancel an existing meetup',
                    admin: true
                },
                
                // Regular Meetup Commands
                { 
                    name: '!meetup schedule', 
                    value: 'View all upcoming meetups'
                },
                { 
                    name: '!meetup rsvp', 
                    value: 'RSVP to a meetup'
                },
                
                // Utility Commands
                { 
                    name: '!help', 
                    value: 'Show this help message'
                },
                { 
                    name: '!ping', 
                    value: 'Check bot\'s response time'
                },
                { 
                    name: '!status', 
                    value: 'View bot\'s health and stats'
                }
            ],
            examples: [
                { 
                    name: 'Get General Help',
                    value: '!help'
                },
                { 
                    name: 'Get Command-Specific Help',
                    value: '!meetup help\n!ping help\n!status help'
                }
            ],
            notes: [
                {
                    name: 'Command Help',
                    value: 'Each command has detailed help available via `!<command> help`'
                },
                {
                    name: 'Admin Commands',
                    value: 'Commands marked with ⚡ require administrator permissions'
                },
                {
                    name: 'RSVP Options',
                    value: 'When RSVPing, you can use: yes, no, or maybe'
                }
            ]
        });

        await message.reply({ embeds: [helpEmbed] });
    }
}; 