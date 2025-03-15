const { EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    name: 'status',
    description: 'Check bot status and connections',
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
    }
}; 