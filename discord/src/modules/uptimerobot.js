const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

class UptimeRobotManager {
    constructor() {
        this.apiKey = process.env.UPTIME_ROBOT_API_KEY;
        this.baseUrl = 'https://api.uptimerobot.com/v2';
        
        if (!this.apiKey) {
            console.error('Uptime Robot API key is missing. Please check your .env file.');
            throw new Error('Uptime Robot API key is not configured');
        }
    }

    async getMonitors() {
        try {
            const response = await axios.post(`${this.baseUrl}/getMonitors`, {
                api_key: this.apiKey,
                format: 'json',
                logs: 1
            });

            if (response.data.stat !== 'ok') {
                throw new Error(`API Error: ${response.data.error?.message || 'Unknown error'}`);
            }

            return response.data.monitors;
        } catch (error) {
            console.error('Failed to fetch Uptime Robot monitors:', error);
            throw error;
        }
    }

    async createStatusEmbed() {
        try {
            const monitors = await this.getMonitors();
            
            const statusEmoji = {
                0: '⚪', // Paused
                1: '🔴', // Not checked yet
                2: '✅', // Up
                8: '⚠️', // Seems down
                9: '❌'  // Down
            };

            const embed = new EmbedBuilder()
                .setTitle('📊 System Status')
                .setColor('#00ff00')
                .setTimestamp();

            let allUp = true;
            let description = '';

            for (const monitor of monitors) {
                const status = statusEmoji[monitor.status] || '❓';
                const uptime = (monitor.custom_uptime_ratio || '0').split('-')[0];
                description += `${status} **${monitor.friendly_name}**\n`;
                description += `├ Status: ${this.getStatusText(monitor.status)}\n`;
                description += `├ Uptime: ${uptime}%\n`;
                
                // Add last incident if monitor is down
                if (monitor.status === 9 || monitor.status === 8) {
                    allUp = false;
                    if (monitor.logs && monitor.logs[0]) {
                        const lastIncident = new Date(monitor.logs[0].datetime * 1000);
                        description += `└ Down since: ${lastIncident.toLocaleString()}\n`;
                    }
                } else {
                    description += `└ Last checked: ${new Date(monitor.last_check * 1000).toLocaleString()}\n`;
                }
                description += '\n';
            }

            embed.setDescription(description);
            embed.setColor(allUp ? '#00ff00' : '#ff0000');

            return embed;
        } catch (error) {
            console.error('Failed to create status embed:', error);
            throw error;
        }
    }

    getStatusText(status) {
        const statusMap = {
            0: 'Paused',
            1: 'Not checked yet',
            2: 'Up',
            8: 'Seems down',
            9: 'Down'
        };
        return statusMap[status] || 'Unknown';
    }

    async updateStatusMessage(client, channelName = 'status') {
        try {
            const channel = client.channels.cache.find(ch => ch.name === channelName);
            if (!channel) {
                throw new Error(`Status channel '${channelName}' not found`);
            }

            const embed = await this.createStatusEmbed();
            
            // Find pinned status message or create new one
            const messages = await channel.messages.fetchPinned();
            const statusMessage = messages.find(m => 
                m.author.id === client.user.id && 
                m.embeds[0]?.title === '📊 System Status'
            );

            if (statusMessage) {
                await statusMessage.edit({ embeds: [embed] });
            } else {
                const message = await channel.send({ embeds: [embed] });
                await message.pin();
            }
        } catch (error) {
            console.error('Failed to update status message:', error);
            throw error;
        }
    }
}

module.exports = new UptimeRobotManager(); 