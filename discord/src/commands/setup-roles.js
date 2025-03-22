const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { createHelpEmbed } = require('../utils/helpFormatter');

const hasAdminPermission = (member) => {
    return member.permissions.has('Administrator') ||
           member.roles.cache.some(role => 
               ['Admin', 'Moderator'].includes(role.name)
           );
};

module.exports = {
    name: 'setup-roles',
    description: 'Set up the role assignment system',
    async execute(message, args) {
        // Check user permissions
        if (!hasAdminPermission(message.member)) {
            return message.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Permission Denied')
                    .setDescription('You need administrator permissions to set up roles.')
                    .setColor('#ff0000')]
            });
        }

        try {
            // Check bot permissions first
            const permCheck = message.client.roleManager.checkBotPermissions(message.guild);
            if (!permCheck.hasPermissions) {
                const permissionsList = permCheck.missing.map(perm => `• ${perm}`).join('\n');
                return message.reply({
                    embeds: [new EmbedBuilder()
                        .setTitle('Missing Bot Permissions')
                        .setDescription(
                            'The bot needs the following permissions to set up roles:\n\n' +
                            permissionsList + '\n\n' +
                            'Please update the bot\'s role permissions and try again.'
                        )
                        .setColor('#ff0000')]
                });
            }

            // Find or create #role-assignment channel
            let channel = message.guild.channels.cache.find(c => c.name === 'role-assignment');
            
            if (!channel) {
                channel = await message.guild.channels.create({
                    name: 'role-assignment',
                    type: 0, // Text channel
                    topic: 'React to get roles that match your interests and expertise!',
                    reason: 'Created for role self-assignment'
                });
            }

            // Clear existing messages in the channel
            const messages = await channel.messages.fetch({ limit: 100 });
            await channel.bulkDelete(messages);

            // Create the role assignment message
            await message.client.roleManager.createRoleMessage(channel);

            await message.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Role System Setup Complete')
                    .setDescription(
                        `Role assignment system has been set up in ${channel}!\n\n` +
                        'Members can now:\n' +
                        '• Use reactions to get roles\n' +
                        '• Use `!role list` to see available roles\n' +
                        '• Use `!role add <role>` to get specific roles\n' +
                        '• Use `!role remove <role>` to remove roles'
                    )
                    .setColor('#00ff00')]
            });
        } catch (error) {
            console.error('Error setting up roles:', error);
            
            // Provide more specific error message
            const errorMessage = error.message.includes('Missing required permissions')
                ? error.message
                : 'Failed to set up role assignment system. Please try again later or contact an admin.';
            
            await message.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Setup Failed')
                    .setDescription(errorMessage)
                    .setColor('#ff0000')]
            });
        }
    }
}; 