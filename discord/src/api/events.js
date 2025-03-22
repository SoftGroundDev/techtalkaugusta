const express = require('express');
const router = express.Router();

// Middleware to verify bot token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || token !== process.env.DISCORD_BOT_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Get all upcoming events
router.get('/api/events', verifyToken, (req, res) => {
    try {
        const meetupManager = req.app.locals.meetupManager;
        if (!meetupManager) {
            return res.status(500).json({ error: 'Meetup manager not initialized' });
        }

        // Get all meetups and filter for upcoming ones
        const meetups = Array.from(meetupManager.meetups.values())
            .filter(meetup => meetup.date >= new Date())
            .sort((a, b) => a.date - b.date)
            .map(meetup => ({
                id: meetup.id,
                title: meetup.title,
                date: meetup.date.toISOString(),
                time: meetup.time,
                location: meetup.location,
                description: meetup.description || '',
                topic: meetup.topic,
                speaker: meetup.speaker,
                registrationUrl: meetup.eventbriteUrl || null,
                attendees: meetup.attendees.size,
                maybes: meetup.maybes.size,
                declined: meetup.declined.size
            }));

        res.json({ events: meetups });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

module.exports = router; 