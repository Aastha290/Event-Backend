const Booking = require('../Models/bookModel');
const Event = require('../Models/eventModel');
const User = require('../Models/userModel');

const createBooking = async (req, res) => {
    try {
        const userId = req.user._id;
        const { eventId, pricePaid } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (![event.price.low, event.price.mid, event.price.high].includes(pricePaid)) {
            return res.status(400).json({ error: 'Invalid pricePaid value' });
        }

        const booking = new Booking({
            eventId,
            userId,
            pricePaid
        });

        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getBookingsForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const bookings = await Booking.find({ eventId }).populate('userId', 'username email');
    if (bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for this event' });
    }

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('userId', 'username email').populate('eventId', 'title');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBooking = async (req, res) => {
    try {
      const { eventId, pricePaid } = req.body;
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      if (eventId) {
  
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ error: 'Event not found' });
        }
        if (![event.price.low, event.price.mid, event.price.high].includes(pricePaid)) {
          return res.status(400).json({ error: 'Invalid pricePaid value' });
        }
        booking.eventId = eventId;
      }
  
      if (pricePaid) {
        const event = await Event.findById(booking.eventId);
        if (![event.price.low, event.price.mid, event.price.high].includes(pricePaid)) {
          return res.status(400).json({ error: 'Invalid pricePaid value' });
        }
        booking.pricePaid = pricePaid;
      }
  
      const updatedBooking = await booking.save();
      res.status(200).json(updatedBooking);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBooking,
  getBookingsForEvent,
  getBookingById,
  updateBooking,
  deleteBooking
};
