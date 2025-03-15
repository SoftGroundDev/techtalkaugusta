const { EmbedBuilder } = require('discord.js');

/**
 * Creates a standardized help embed for commands
 * @param {Object} options Help message options
 * @param {string} options.title The title of the help message
 * @param {string} options.description Brief description of the command
 * @param {Array<{name: string, value: string, admin?: boolean}>} options.commands List of subcommands and their descriptions
 * @param {Array<{name: string, value: string}>} [options.examples] Optional examples of command usage
 * @param {Array<{name: string, value: string}>} [options.notes] Optional additional notes or tips
 * @param {string} [options.emoji='ℹ️'] Optional emoji for the title
 * @returns {EmbedBuilder} Formatted help embed
 */
function createHelpEmbed({ 
    title, 
    description, 
    commands, 
    examples = [], 
    notes = [],
    emoji = 'ℹ️'
}) {
    // Format commands by grouping admin and regular commands
    const adminCommands = commands.filter(cmd => cmd.admin);
    const regularCommands = commands.filter(cmd => !cmd.admin);

    const embed = new EmbedBuilder()
        .setTitle(`${emoji} ${title}`)
        .setColor('#0099ff')
        .setDescription(`${description}\n\n*Type \`!help\` for a list of all commands*`);

    // Add regular commands if any exist
    if (regularCommands.length > 0) {
        embed.addFields({
            name: '📝 Available Commands',
            value: regularCommands.map(cmd => {
                const cmdStr = `\`${cmd.name}\``;
                const padding = ' '.repeat(Math.max(0, 25 - cmd.name.length));
                return `${cmdStr}${padding}${cmd.value}`;
            }).join('\n'),
            inline: false
        });
    }

    // Add admin commands if any exist
    if (adminCommands.length > 0) {
        embed.addFields({
            name: '⚡ Admin Commands',
            value: adminCommands.map(cmd => {
                const cmdStr = `\`${cmd.name}\``;
                const padding = ' '.repeat(Math.max(0, 25 - cmd.name.length));
                return `${cmdStr}${padding}${cmd.value}`;
            }).join('\n'),
            inline: false
        });
    }

    // Add examples if provided
    if (examples.length > 0) {
        embed.addFields({
            name: '💡 Examples',
            value: examples.map(ex => (
                `**${ex.name}**\n` +
                `\`\`\`\n${ex.value}\n\`\`\``
            )).join('\n'),
            inline: false
        });
    }

    // Add notes if provided
    if (notes.length > 0) {
        embed.addFields({
            name: '📌 Notes',
            value: notes.map(note => `• ${note.value}`).join('\n'),
            inline: false
        });
    }

    embed.setFooter({ 
        text: 'Tip: Use !<command> help for detailed information about any command' 
    })
    .setTimestamp();

    return embed;
}

module.exports = { createHelpEmbed }; 