const express = require('express');
const { check } = require('express-validator');
const eventController = require('../Controller/eventController');
const authMiddleware = require('../middleware/authToken');

const router = express.Router();

router.post(
    '/',
    authMiddleware,
    eventController.createEvent
);

router.get(
    '/',
    authMiddleware,
    eventController.getAllEvents
);

router.get(
    '/:id',
    authMiddleware,
    eventController.getEventById
);

router.put(
    '/:id',
    authMiddleware,
    eventController.updateEvent
);

router.delete(
    '/:id',
    authMiddleware,
    eventController.deleteEvent
);

module.exports = router;
