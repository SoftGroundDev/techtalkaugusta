const { EmbedBuilder } = require('discord.js');
const { createHelpEmbed } = require('../utils/helpFormatter');

// Available roles configuration
const AVAILABLE_ROLES = {
    // Languages
    'javascript': { color: '#F7DF1E', category: 'Languages' },
    'python': { color: '#3776AB', category: 'Languages' },
    'java': { color: '#007396', category: 'Languages' },
    'csharp': { color: '#239120', category: 'Languages' },
    
    // Frontend
    'react': { color: '#61DAFB', category: 'Frontend' },
    'angular': { color: '#DD0031', category: 'Frontend' },
    'vue': { color: '#4FC08D', category: 'Frontend' },
    
    // Backend
    'nodejs': { color: '#339933', category: 'Backend' },
    'dotnet': { color: '#512BD4', category: 'Backend' },
    'spring': { color: '#6DB33F', category: 'Backend' },
    
    // DevOps
    'docker': { color: '#2496ED', category: 'DevOps' },
    'kubernetes': { color: '#326CE5', category: 'DevOps' },
    'aws': { color: '#FF9900', category: 'DevOps' },
    'azure': { color: '#0078D4', category: 'DevOps' },
    
    // Database
    'mongodb': { color: '#47A248', category: 'Database' },
    'postgresql': { color: '#336791', category: 'Database' },
    'mysql': { color: '#4479A1', category: 'Database' },
    
    // Mobile
    'ios': { color: '#000000', category: 'Mobile' },
    'android': { color: '#3DDC84', category: 'Mobile' },
    'flutter': { color: '#02569B', category: 'Mobile' },
    
    // Other
    'design': { color: '#FF7F50', category: 'Other' },
    'security': { color: '#FF0000', category: 'Other' },
    'ai': { color: '#00FFFF', category: 'Other' }
};

const commands = {
    async list(message) {
        const rolesByCategory = {};
        
        // Group roles by category
        Object.entries(AVAILABLE_ROLES).forEach(([name, info]) => {
            if (!rolesByCategory[info.category]) {
                rolesByCategory[info.category] = [];
            }
            rolesByCategory[info.category].push(name);
        });
        
        const embed = new EmbedBuilder()
            .setTitle('Available Roles')
            .setDescription('React with the corresponding emoji to get a role!')
            .setColor('#00ff00');
            
        // Add fields for each category
        Object.entries(rolesByCategory).forEach(([category, roles]) => {
            embed.addFields({
                name: `${category}`,
                value: roles.map(role => `\`${role}\``).join(', '),
                inline: false
            });
        });
        
        await message.reply({ embeds: [embed] });
    },
    
    async add(message, args) {
        const roleName = args[0]?.toLowerCase();
        
        if (!roleName || !AVAILABLE_ROLES[roleName]) {
            return message.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Invalid Role')
                    .setDescription('Please specify a valid role. Use `!role list` to see available roles.')
                    .setColor('#ff0000')]
            });
        }
        
        try {
            // Check if role exists in guild, if not create it
            let role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName);
            if (!role) {
                role = await message.guild.roles.create({
                    name: roleName,
                    color: AVAILABLE_ROLES[roleName].color,
                    reason: 'Auto-created for role self-assignment'
                });
            }
            
            // Add role to user
            await message.member.roles.add(role);
            
            await message.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Role Added')
                    .setDescription(`You now have the \`${roleName}\` role!`)
                    .setColor('#00ff00')]
            });
        } catch (error) {
            console.error('Error adding role:', error);
            await message.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Error')
                    .setDescription('Failed to add role. Please try again later or contact an admin.')
                    .setColor('#ff0000')]
            });
        }
    },
    
    async remove(message, args) {
        const roleName = args[0]?.toLowerCase();
        
        if (!roleName || !AVAILABLE_ROLES[roleName]) {
            return message.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Invalid Role')
                    .setDescription('Please specify a valid role. Use `!role list` to see available roles.')
                    .setColor('#ff0000')]
            });
        }
        
        try {
            const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName);
            if (!role) {
                return message.reply({
                    embeds: [new EmbedBuilder()
                        .setTitle('Role Not Found')
                        .setDescription(`The role \`${roleName}\` doesn't exist in this server.`)
                        .setColor('#ff0000')]
                });
            }
            
            await message.member.roles.remove(role);
            
            await message.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Role Removed')
                    .setDescription(`The \`${roleName}\` role has been removed.`)
                    .setColor('#00ff00')]
            });
        } catch (error) {
            console.error('Error removing role:', error);
            await message.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Error')
                    .setDescription('Failed to remove role. Please try again later or contact an admin.')
                    .setColor('#ff0000')]
            });
        }
    },
    
    async help(message) {
        const helpEmbed = createHelpEmbed({
            title: 'Role Management Commands',
            description: 'Manage your roles in the community',
            emoji: '🎭',
            commands: [
                { name: '!role list', value: 'Show all available roles' },
                { name: '!role add <role>', value: 'Add a role to yourself' },
                { name: '!role remove <role>', value: 'Remove a role from yourself' },
                { name: '!role help', value: 'Show this help message' }
            ],
            examples: [
                { name: 'List Roles', value: '!role list' },
                { name: 'Add Role', value: '!role add javascript' },
                { name: 'Remove Role', value: '!role remove python' }
            ]
        });
        
        await message.reply({ embeds: [helpEmbed] });
    }
};

module.exports = {
    name: 'role',
    description: 'Manage your roles',
    async execute(message, args) {
        const subcommand = args[0]?.toLowerCase();
        const subcommandArgs = args.slice(1);
        
        switch (subcommand) {
            case 'list':
                await commands.list(message);
                break;
            case 'add':
                await commands.add(message, subcommandArgs);
                break;
            case 'remove':
                await commands.remove(message, subcommandArgs);
                break;
            case 'help':
                await commands.help(message);
                break;
            default:
                await commands.help(message);
        }
    }
}; 