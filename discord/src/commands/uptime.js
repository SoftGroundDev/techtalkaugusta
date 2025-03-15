const { EmbedBuilder } = require('discord.js');
const { createHelpEmbed } = require('../utils/helpFormatter');
const uptimeRobot = require('../modules/uptimerobot');

const commands = {
    async status(message) {
        try {
            const embed = await uptimeRobot.createStatusEmbed();
            await message.reply({ embeds: [embed] });
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Error Fetching Status')
                .setColor('#ff0000')
                .setDescription(`Failed to fetch system status: ${error.message}`);
            await message.reply({ embeds: [errorEmbed] });
        }
    },

    async monitor(message) {
        try {
            await uptimeRobot.updateStatusMessage(message.client);
            const embed = new EmbedBuilder()
                .setTitle('✅ Status Channel Updated')
                .setColor('#00ff00')
                .setDescription('The status channel has been updated with the latest monitoring information.');
            await message.reply({ embeds: [embed] });
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Error Updating Status Channel')
                .setColor('#ff0000')
                .setDescription(`Failed to update status channel: ${error.message}`);
            await message.reply({ embeds: [errorEmbed] });
        }
    },

    async help(message) {
        const helpEmbed = createHelpEmbed({
            title: 'Uptime Monitoring Commands',
            description: 'Monitor and manage system uptime status using UptimeRobot integration.',
            emoji: '📊',
            commands: [
                { 
                    name: '!uptime status', 
                    value: 'Show current system status' 
                },
                { 
                    name: '!uptime monitor', 
                    value: 'Update the status monitoring channel',
                    admin: true
                },
                { 
                    name: '!uptime help', 
                    value: 'Show this help message' 
                }
            ],
            examples: [
                { 
                    name: 'Check System Status',
                    value: '!uptime status'
                },
                { 
                    name: 'Update Status Channel',
                    value: '!uptime monitor'
                }
            ],
            notes: [
                {
                    name: 'Status Updates',
                    value: 'The status channel is automatically updated every 5 minutes'
                },
                {
                    name: 'Monitoring',
                    value: 'System status is monitored using UptimeRobot'
                }
            ]
        });

        await message.reply({ embeds: [helpEmbed] });
    }
};

module.exports = {
    name: 'uptime',
    description: 'Monitor system uptime and status',
    async execute(message, args) {
        const subcommand = args[0]?.toLowerCase();
        
        if (subcommand === 'help') {
            await commands.help(message);
            return;
        }

        if (subcommand === 'monitor') {
            // Check if user has admin permissions
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                const embed = new EmbedBuilder()
                    .setTitle('❌ Permission Denied')
                    .setColor('#ff0000')
                    .setDescription('You need administrator permissions to update the status channel.');
                await message.reply({ embeds: [embed] });
                return;
            }
            await commands.monitor(message);
            return;
        }

        await commands.status(message);
    }
}; 