const { verifyKey } = require('discord-interactions');
const db = require('../modules/database');
const eventbrite = require('../modules/eventbrite');

// Command handlers
const commands = {
    meetup: require('../commands/meetup'),
    status: require('../commands/status'),
    help: require('../commands/help')
};

// Verify Discord interaction
const verifyDiscordRequest = (publicKey) => {
    return function (req, res, next) {
        const signature = req.headers['x-signature-ed25519'];
        const timestamp = req.headers['x-signature-timestamp'];
        const body = req.rawBody;

        const isValidRequest = verifyKey(body, signature, timestamp, publicKey);
        if (!isValidRequest) {
            res.status(401).send('Invalid request signature');
            return;
        }
        next();
    };
};

// Main handler
exports.handler = async (event, context) => {
    try {
        // Verify request
        const publicKey = process.env.DISCORD_PUBLIC_KEY;
        if (!verifyDiscordRequest(publicKey)(event)) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid request signature' })
            };
        }

        const body = JSON.parse(event.body);

        // Handle ping
        if (body.type === 1) {
            return {
                statusCode: 200,
                body: JSON.stringify({ type: 1 })
            };
        }

        // Handle slash command
        if (body.type === 2) {
            const { name, options } = body.data;
            const command = commands[name];

            if (!command) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ error: 'Command not found' })
                };
            }

            // Connect to database if needed
            if (!db.isConnected) {
                await db.connect();
            }

            // Execute command
            const response = await command.execute(body, options);

            return {
                statusCode: 200,
                body: JSON.stringify(response)
            };
        }

        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Unknown interaction type' })
        };
    } catch (error) {
        console.error('Error handling interaction:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
}; 