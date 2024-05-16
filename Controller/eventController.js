const Event = require('../Models/eventModel');
const User = require('../Models/userModel'); 

const createEvent = async (req, res) => {
    const { title, description, date, time, location, price } = req.body;
    console.log("event",req.body)

    if (!title || !description || !date || !time || !location || !price || !price.low || !price.mid || !price.high) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userId = req.user._id;
        const event = new Event({ title, description, date, time, location, price, userId });
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('userId', 'username email'); // Populate to get user details
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('userId', 'username email');
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid Event ID' });
        }
        res.status(500).json({ error: err.message });
    }
};

const updateEvent = async (req, res) => {
    console.log("updated inside.")
    const { title, description, date, time, location, price } = req.body;
    console.log("updated",req.body)
    if (!title || !description || !date || !time || !location || !price || !price.low || !price.mid || !price.high) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, date, time, location, price },
            { new: true, runValidators: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid Event ID' });
        }
        res.status(500).json({ error: err.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid Event ID' });
        }
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};
