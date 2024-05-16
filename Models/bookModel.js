const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  pricePaid: {
    type: Number,
    required: true,
    validate: {
      validator: async function (value) {
        const event = await mongoose.model('Event').findById(this.eventId);
        return event && (value === event.price.low || value === event.price.mid || value === event.price.high);
      },
      message: 'Price paid must be one of the predefined event prices.'
    }
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
