const express = require('express');
const router = express.Router();
const { EventController } = require('../controllers');
const { FileUpload } = require('../middlewares');

router.get('/events', EventController.getAllEvents);
router.get('/events/:id', EventController.getEventById);
router.post('/events', EventController.createEvent);
router.put('/events/:id', EventController.updateEvent);
router.delete('/events/:id', EventController.deleteEvent);

// Upload image for event
router.post('/events/:id/upload-image', FileUpload.uploadEventImage, EventController.uploadEventImage);

// Additional routes
router.get('/users/:username/events', EventController.getEventsByUsername);
router.get('/categories/:categoryId/events', EventController.getEventsByCategory);

// Endpoint untuk mendapatkan price per person
router.get('/events/:id/price', EventController.getEventPricePerPerson);

module.exports = router;

// Removed the misplaced method. It has been moved to EventController in event_controller.js.