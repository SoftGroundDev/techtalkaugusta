const { EmbedBuilder } = require('discord.js');
const { createHelpEmbed } = require('../utils/helpFormatter');

const commands = {
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
    },

    async help(message) {
        const helpEmbed = createHelpEmbed({
            title: 'Ping Command Help',
            description: 'Check the bot\'s response time and connection status. This command helps verify that the bot is responsive and shows the current latency between the bot and Discord servers.',
            emoji: '🏓',
            commands: [
                { 
                    name: '!ping', 
                    value: 'Test bot response time and show latency' 
                },
                { 
                    name: '!ping help', 
                    value: 'Display this help message' 
                }
            ],
            examples: [
                { 
                    name: 'Basic Usage',
                    value: '!ping'
                }
            ],
            notes: [
                {
                    name: 'Bot Latency',
                    value: 'Shows the time it takes for the bot to process and respond to your message'
                },
                {
                    name: 'WebSocket Latency',
                    value: 'Shows the connection speed between the bot and Discord\'s servers'
                }
            ]
        });

        await message.reply({ embeds: [helpEmbed] });
    }
};

module.exports = {
    name: 'ping',
    description: 'Check bot\'s response time',
    async execute(message, args) {
        const subcommand = args[0]?.toLowerCase();
        
        if (subcommand === 'help') {
            await commands.help(message);
            return;
        }

        await commands.execute(message);
    }
}; 