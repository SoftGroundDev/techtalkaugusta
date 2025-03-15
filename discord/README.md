# Tech Talk Augusta Discord Bot

A Discord bot designed specifically for the Tech Talk Augusta meetup community.

## Features

- 👋 Automatic welcome messages for new members
- 📅 Meetup scheduling and reminders
- 📚 Tech resource sharing
- 📊 Polls for meetup topics
- 🏷️ Automated role assignment

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Discord bot token
   - (Optional) Add MongoDB URI if using database features

3. **Create a Discord Application**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Add a bot to your application
   - Copy the bot token to your `.env` file
   - Enable necessary intents (Presence, Server Members, Message Content)

4. **Invite the Bot**
   - Generate an invite link from the OAuth2 section
   - Required permissions:
     - Send Messages
     - Read Messages/View Channels
     - Manage Roles
     - Manage Messages
     - Add Reactions

5. **Run the Bot**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Available Commands

- `!help` - Display available commands
- `!schedule` - View upcoming meetups
- `!suggest <topic>` - Suggest a meetup topic
- `!resources` - Share or view tech resources
- `!poll` - Create a poll (admin only)

## Recommended Discord Channel Structure

- #welcome
- #rules
- #announcements
- #introductions
- #general
- #meetup-schedule
- #resources
- #project-showcase
- #job-board
- #tech-help
- #role-assignment

## Contributing

Feel free to submit issues and enhancement requests! 