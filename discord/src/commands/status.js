const { EmbedBuilder } = require('discord.js');
const os = require('os');
const { createHelpEmbed } = require('../utils/helpFormatter');

const commands = {
    async execute(message) {
        const client = message.client;
        
        // Calculate uptime
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        // Get system info
        const memoryUsage = process.memoryUsage();
        const systemMemory = {
            total: (os.totalmem() / 1024 / 1024).toFixed(2),
            free: (os.freemem() / 1024 / 1024).toFixed(2),
            used: ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2)
        };

        // Check database connection
        let dbStatus = '❌ Not Connected';
        try {
            if (client.meetupManager && await client.meetupManager.isDbConnected()) {
                dbStatus = '✅ Connected';
            }
        } catch (error) {
            dbStatus = `❌ Error: ${error.message}`;
        }

        // Create status embed
        const embed = new EmbedBuilder()
            .setTitle('🤖 Bot Status')
            .setColor('#00ff00')
            .addFields(
                { 
                    name: '🔌 Connection Status',
                    value: `Discord WebSocket: ${client.ws.status === 0 ? '✅ Connected' : '❌ Disconnected'}\nPing: ${client.ws.ping}ms\nDatabase: ${dbStatus}`,
                    inline: false
                },
                {
                    name: '⏰ Uptime',
                    value: `${days}d ${hours}h ${minutes}m ${seconds}s`,
                    inline: true
                },
                {
                    name: '💾 Memory Usage',
                    value: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB / ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
                    inline: true
                },
                {
                    name: '🖥️ System Memory',
                    value: `Used: ${systemMemory.used} MB\nFree: ${systemMemory.free} MB\nTotal: ${systemMemory.total} MB`,
                    inline: true
                },
                {
                    name: '📊 Stats',
                    value: `Servers: ${client.guilds.cache.size}\nChannels: ${client.channels.cache.size}\nUsers: ${client.users.cache.size}`,
                    inline: true
                }
            )
            .setFooter({ text: 'Tech Talk Augusta Bot' })
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    },

    async help(message) {
        const helpEmbed = createHelpEmbed({
            title: 'Status Command Help',
            description: 'View detailed information about the bot\'s current status, including connection health, system resources, and statistics.',
            emoji: '🤖',
            commands: [
                { 
                    name: '!status', 
                    value: 'Display comprehensive bot status information' 
                },
                { 
                    name: '!status help', 
                    value: 'Show this help message' 
                }
            ],
            examples: [
                { 
                    name: 'Check Bot Status',
                    value: '!status'
                }
            ],
            notes: [
                {
                    name: 'Connection Status',
                    value: 'Shows Discord WebSocket and database connection health'
                },
                {
                    name: 'System Resources',
                    value: 'Displays memory usage and system statistics'
                },
                {
                    name: 'Bot Statistics',
                    value: 'Shows the number of servers, channels, and users the bot is connected to'
                },
                {
                    name: 'Uptime',
                    value: 'Indicates how long the bot has been running since last restart'
                }
            ]
        });

        await message.reply({ embeds: [helpEmbed] });
    }
};

module.exports = {
    name: 'status',
    description: 'Check bot status and connections',
    async execute(message, args) {
        const subcommand = args[0]?.toLowerCase();
        
        if (subcommand === 'help') {
            await commands.help(message);
            return;
        }

        await commands.execute(message);
    }
}; 