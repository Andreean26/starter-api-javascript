const { ParticipantService, EventService, AccountService } = require('../services');
const { ParticipantDTO } = require('../dtos');
const { ResponseUtil } = require('../utils');

class ParticipantController {
  static async getAllParticipants(req, res) {
    try {
      const participants = await ParticipantService.getAllParticipants();
      return res.json(ResponseUtil.SuccessResponse(participants));
    } catch (error) {
      console.error('Error getting all participants:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async getParticipantById(req, res) {
    try {
      const id = req.params.id;
      const participant = await ParticipantService.getParticipantById(id);
      
      if (!participant) {
        return res.json(ResponseUtil.NotFound('Participant not found'));
      }
      
      return res.json(ResponseUtil.SuccessResponse(participant));
    } catch (error) {
      console.error('Error getting participant:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async createParticipant(req, res) {
    try {
      const participantData = req.body;
      
      // Validate input data
      const validationErrors = ParticipantDTO.validate(participantData);
      if (validationErrors) {
        return res.json(ResponseUtil.UnprocessableEntity(validationErrors));
      }
      
      // Check if event exists
      const event = await EventService.getEventById(participantData.event_id);
      if (!event) {
        return res.json(ResponseUtil.UnprocessableEntity('Event with this ID does not exist'));
      }

      // Check if account exists (if account_id is provided)
      if (participantData.account_id) {
        const account = await AccountService.getAccountById(participantData.account_id);
        if (!account) {
          return res.json(ResponseUtil.UnprocessableEntity('Account with this ID does not exist'));
        }
      }
      
      const newParticipant = await ParticipantService.createParticipant(participantData);
      
      // Fetch the newly created participant with its relationships
      const createdParticipant = await ParticipantService.getParticipantById(newParticipant.id);
      return res.json(ResponseUtil.Created(createdParticipant));
    } catch (error) {
      console.error('Error creating participant:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async updateParticipant(req, res) {
    try {
      const id = req.params.id;
      const participantData = req.body;
      
      // Validate input data
      const validationErrors = ParticipantDTO.validate(participantData, true);
      if (validationErrors) {
        return res.json(ResponseUtil.UnprocessableEntity(validationErrors));
      }
      
      // Check if participant exists
      const existingParticipant = await ParticipantService.getParticipantById(id);
      if (!existingParticipant) {
        return res.json(ResponseUtil.NotFound('Participant not found'));
      }

      // Check if account exists (if updating account_id)
      if (participantData.account_id) {
        const account = await AccountService.getAccountById(participantData.account_id);
        if (!account) {
          return res.json(ResponseUtil.UnprocessableEntity('Account with this ID does not exist'));
        }
      }
      
      const updatedParticipant = await ParticipantService.updateParticipant(id, participantData);
      return res.json(ResponseUtil.SuccessResponse(updatedParticipant));
    } catch (error) {
      console.error('Error updating participant:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async deleteParticipant(req, res) {
    try {
      const id = req.params.id;
      
      // Check if participant exists
      const existingParticipant = await ParticipantService.getParticipantById(id);
      if (!existingParticipant) {
        return res.json(ResponseUtil.NotFound('Participant not found'));
      }
      
      await ParticipantService.deleteParticipant(id);
      return res.json(ResponseUtil.SuccessResponse(null, 'Participant successfully deleted'));
    } catch (error) {
      console.error('Error deleting participant:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async getParticipantsByEventId(req, res) {
    try {
      const eventId = req.params.eventId;
      
      // Check if event exists
      const event = await EventService.getEventById(eventId);
      if (!event) {
        return res.json(ResponseUtil.NotFound('Event not found'));
      }
      
      const participants = await ParticipantService.getParticipantsByEventId(eventId);
      return res.json(ResponseUtil.SuccessResponse(participants));
    } catch (error) {
      console.error('Error getting participants by event ID:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }
}

module.exports = ParticipantController;