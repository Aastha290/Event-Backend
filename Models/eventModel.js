const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    low: {
      type: Number,
      required: true
    },
    mid: {
      type: Number,
      required: true
    },
    high: {
      type: Number,
      required: true
    }
    
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
