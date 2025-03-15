const { EmbedBuilder } = require('discord.js');
const { createHelpEmbed } = require('../utils/helpFormatter');

const formatUptime = (uptime) => {
    const days = Math.floor(uptime / (24 * 60 * 60));
    const hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);
    
    const parts = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
    
    return parts.join(', ');
};

const commands = {
    async status(message) {
        const uptime = process.uptime();
        const embed = new EmbedBuilder()
            .setTitle('🤖 Bot Status')
            .setColor('#00ff00')
            .addFields(
                { name: 'Status', value: '✅ Online', inline: true },
                { name: 'Uptime', value: formatUptime(uptime), inline: true },
                { name: 'Memory Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true }
            )
            .setTimestamp();
        await message.reply({ embeds: [embed] });
    },

    async help(message) {
        const helpEmbed = createHelpEmbed({
            title: 'Bot Uptime Commands',
            description: 'Check the bot\'s current status and uptime.',
            emoji: '🤖',
            commands: [
                { 
                    name: '!uptime', 
                    value: 'Show current bot status and uptime' 
                },
                { 
                    name: '!uptime help', 
                    value: 'Show this help message' 
                }
            ],
            examples: [
                { 
                    name: 'Check Bot Status',
                    value: '!uptime'
                }
            ],
            notes: [
                {
                    name: 'Health Checks',
                    value: 'The bot provides a /health endpoint for external monitoring'
                }
            ]
        });

        await message.reply({ embeds: [helpEmbed] });
    }
};

module.exports = {
    name: 'uptime',
    description: 'Check bot uptime and status',
    async execute(message, args) {
        const subcommand = args[0]?.toLowerCase();
        
        if (subcommand === 'help') {
            await commands.help(message);
            return;
        }

        // Default to status if no subcommand provided
        await commands.status(message);
    }
}; 