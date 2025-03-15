const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Check bot\'s response time',
    async execute(message) {
        // Send initial message
        const sent = await message.reply('Pinging...');

        // Calculate round-trip latency
        const tripLatency = sent.createdTimestamp - message.createdTimestamp;
        
        // Get WebSocket latency
        const wsLatency = message.client.ws.ping;

        // Create embed with detailed ping information
        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setColor('#00ff00')
            .addFields(
                { 
                    name: 'Bot Latency', 
                    value: `${tripLatency}ms`,
                    inline: true 
                },
                { 
                    name: 'WebSocket Latency', 
                    value: `${wsLatency}ms`,
                    inline: true 
                }
            )
            .setFooter({ text: 'Tech Talk Augusta Bot' })
            .setTimestamp();

        // Edit the initial message with the embed
        await sent.edit({ content: null, embeds: [embed] });
    }
}; 