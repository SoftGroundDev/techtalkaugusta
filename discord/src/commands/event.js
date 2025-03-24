const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const eventSync = require('../modules/eventSync');
const { logger } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Create and manage events')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a new event'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List upcoming events'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Delete an event')
                .addStringOption(option =>
                    option.setName('event_id')
                        .setDescription('The ID of the event to delete')
                        .setRequired(true))),

    async execute(interaction) {
        try {
            const subcommand = interaction.options.getSubcommand();

            switch (subcommand) {
                case 'create':
                    await handleCreate(interaction);
                    break;
                case 'list':
                    await handleList(interaction);
                    break;
                case 'delete':
                    await handleDelete(interaction);
                    break;
            }
        } catch (error) {
            logger.error('Error executing event command:', error);
            await interaction.reply({
                content: 'An error occurred while processing your request.',
                ephemeral: true
            });
        }
    }
};

async function handleCreate(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('event_create_modal')
        .setTitle('Create New Event');

    const titleInput = new TextInputBuilder()
        .setCustomId('event_title')
        .setLabel('Event Title')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const descriptionInput = new TextInputBuilder()
        .setCustomId('event_description')
        .setLabel('Event Description')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const dateInput = new TextInputBuilder()
        .setCustomId('event_date')
        .setLabel('Event Date (YYYY-MM-DD)')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const timeInput = new TextInputBuilder()
        .setCustomId('event_time')
        .setLabel('Event Time (HH:MM)')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const locationInput = new TextInputBuilder()
        .setCustomId('event_location')
        .setLabel('Event Location')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const priceInput = new TextInputBuilder()
        .setCustomId('event_price')
        .setLabel('Event Price (optional)')
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

    modal.addComponents(
        new ActionRowBuilder().addComponents(titleInput),
        new ActionRowBuilder().addComponents(descriptionInput),
        new ActionRowBuilder().addComponents(dateInput),
        new ActionRowBuilder().addComponents(timeInput),
        new ActionRowBuilder().addComponents(locationInput),
        new ActionRowBuilder().addComponents(priceInput)
    );

    await interaction.showModal(modal);
}

async function handleList(interaction) {
    // TODO: Implement event listing
    await interaction.reply('Event listing feature coming soon!');
}

async function handleDelete(interaction) {
    const eventId = interaction.options.getString('event_id');
    
    try {
        const result = await eventSync.deleteEvent(eventId);
        
        if (result.success) {
            await interaction.reply({
                content: 'Event deleted successfully!',
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: `Failed to delete event: ${result.error}`,
                ephemeral: true
            });
        }
    } catch (error) {
        logger.error('Error deleting event:', error);
        await interaction.reply({
            content: 'An error occurred while deleting the event.',
            ephemeral: true
        });
    }
} 