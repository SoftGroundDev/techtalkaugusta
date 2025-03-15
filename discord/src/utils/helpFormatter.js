const { EmbedBuilder } = require('discord.js');

/**
 * Creates a standardized help embed for commands
 * @param {Object} options Help message options
 * @param {string} options.title The title of the help message
 * @param {string} options.description Brief description of the command
 * @param {Array<{name: string, value: string}>} options.commands List of subcommands and their descriptions
 * @param {Array<{name: string, value: string}>} [options.examples] Optional examples of command usage
 * @returns {EmbedBuilder} Formatted help embed
 */
function createHelpEmbed({ title, description, commands, examples = [] }) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor('#0099ff')
        .setDescription(description)
        .addFields({ name: 'Commands', value: commands.map(cmd => `\`${cmd.name}\` - ${cmd.value}`).join('\n'), inline: false });

    if (examples.length > 0) {
        embed.addFields({ 
            name: '📝 Examples', 
            value: examples.map(ex => `\`${ex.name}\`\n${ex.value}`).join('\n\n'),
            inline: false 
        });
    }

    embed.setFooter({ text: 'Type !help for a list of all commands' })
        .setTimestamp();

    return embed;
}

module.exports = { createHelpEmbed }; 