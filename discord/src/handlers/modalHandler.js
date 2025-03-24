const { EmbedBuilder } = require('discord.js');
const eventSync = require('../modules/eventSync');
const { logger } = require('../utils/logger');

module.exports = {
    async handleModal(interaction) {
        try {
            const modalId = interaction.customId;

            switch (modalId) {
                case 'event_create_modal':
                    await handleEventCreate(interaction);
                    break;
                default:
                    logger.warn(`Unknown modal ID: ${modalId}`);
            }
        } catch (error) {
            logger.error('Error handling modal:', error);
            await interaction.reply({
                content: 'An error occurred while processing your request.',
                ephemeral: true
            });
        }
    }
};

async function handleEventCreate(interaction) {
    try {
        const title = interaction.fields.getTextInputValue('event_title');
        const description = interaction.fields.getTextInputValue('event_description');
        const date = interaction.fields.getTextInputValue('event_date');
        const time = interaction.fields.getTextInputValue('event_time');
        const location = interaction.fields.getTextInputValue('event_location');
        const price = interaction.fields.getTextInputValue('event_price');

        // Validate date and time
        const startTime = new Date(`${date}T${time}`);
        if (isNaN(startTime.getTime())) {
            throw new Error('Invalid date or time format');
        }

        // Create event data
        const eventData = {
            id: Date.now().toString(), // Temporary ID
            title,
            description,
            startTime: startTime.toISOString(),
            duration: 7200000, // Default 2 hours
            location,
            price: price ? parseFloat(price) : null,
            timezone: 'America/New_York' // Default timezone
        };

        // Create event on all platforms
        const result = await eventSync.createEvent(eventData);

        if (result.success) {
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Event Created Successfully!')
                .setDescription(title)
                .addFields(
                    { name: 'Date', value: startTime.toLocaleDateString(), inline: true },
                    { name: 'Time', value: startTime.toLocaleTimeString(), inline: true },
                    { name: 'Location', value: location, inline: true },
                    { name: 'Price', value: price ? `$${price}` : 'Free', inline: true }
                )
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        logger.error('Error creating event:', error);
        await interaction.reply({
            content: `Failed to create event: ${error.message}`,
            ephemeral: true
        });
    }
} 