const express = require('express');
const router = express.Router();
const { ParticipantController } = require('../controllers');

router.get('/participants', ParticipantController.getAllParticipants);
router.get('/participants/:id', ParticipantController.getParticipantById);
router.post('/participants', ParticipantController.createParticipant);
router.put('/participants/:id', ParticipantController.updateParticipant);
router.delete('/participants/:id', ParticipantController.deleteParticipant);

// Additional route
router.get('/events/:eventId/participants', ParticipantController.getParticipantsByEventId);

// Endpoint untuk registrasi peserta
router.post('/register', ParticipantController.registerParticipant);

module.exports = router;