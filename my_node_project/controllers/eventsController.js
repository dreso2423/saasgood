// eventsController.js
const Event = require('../models/Event');

const createEvent = async (req, res) => {
    try {
        const { gclid, fbclid, ttclid, liclid, ...rest } = req.body;
        const newEvent = await Event.create({
            platform_specific_tracking_ids: { gclid, fbclid, ttclid, liclid },
            ...rest
        });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { gclid, fbclid, ttclid, liclid, ...rest } = req.body;
        const updatedEvent = await Event.update({
            platform_specific_tracking_ids: { gclid, fbclid, ttclid, liclid },
            ...rest
        }, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.status(200).json(updatedEvent[1]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        await Event.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
};