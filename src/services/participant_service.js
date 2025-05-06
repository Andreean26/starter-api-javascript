const { Participant, Event } = require('../models');

class ParticipantService {
  static async getAllParticipants() {
    return await Participant.findAll({
      include: [{ model: Event, attributes: ['id', 'event_name'] }]
    });
  }

  static async getParticipantById(id) {
    return await Participant.findByPk(id, {
      include: [{ model: Event, attributes: ['id', 'event_name'] }]
    });
  }

  static async createParticipant(participantData) {
    return await Participant.create(participantData);
  }

  static async updateParticipant(id, participantData) {
    const [updated] = await Participant.update(participantData, {
      where: { id }
    });
    
    if (updated) {
      return await this.getParticipantById(id);
    }
    
    return null;
  }

  static async deleteParticipant(id) {
    return await Participant.destroy({
      where: { id }
    });
  }

  static async getParticipantsByEventId(eventId) {
    return await Participant.findAll({
      where: { event_id: eventId }
    });
  }
}

module.exports = ParticipantService;