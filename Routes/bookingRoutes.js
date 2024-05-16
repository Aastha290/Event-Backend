const express = require('express');
const bookingController = require('../Controller/bookingController');
const authMiddleware = require('../middleware/authToken');

const router = express.Router();

router.post(
    '/', 
    authMiddleware, 
    bookingController.createBooking
);

router.get(
    '/event/:eventId', 
    authMiddleware, 
    bookingController.getBookingsForEvent
);

router.get(
    '/:id', 
    authMiddleware, 
    bookingController.getBookingById
);

router.put(
    '/:id', 
    authMiddleware, 
    bookingController.updateBooking
);

router.delete(
    '/:id', 
    authMiddleware, 
    bookingController.deleteBooking
);

module.exports = router;
