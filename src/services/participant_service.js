const { Participant } = require('../models');

class ParticipantService {
  static async getAllParticipants() {
    return await Participant.findAll({
      include: [
        { model: Event, attributes: ['id', 'event_name'] },
        { model: Account, attributes: ['id', 'username', 'email', 'phone_number'], as: 'account' } // Tambahkan alias 'account'
      ]
    });
  }

  static async getParticipantById(id) {
    return await Participant.findByPk(id, {
      include: [
        { model: Event, attributes: ['id', 'event_name'] },
        { model: Account, attributes: ['id', 'username', 'email', 'phone_number'], as: 'account' } // Tambahkan alias 'account'
      ]
    });
  }

  static async createParticipant(participantData) {
    return await Participant.create(participantData);
  }

  static async updateParticipant(id, participantData) {
    // Jika account_id diperbarui, ambil data dari tabel accounts
    if (participantData.account_id) {
      const account = await Account.findByPk(participantData.account_id);
      if (account) {
        participantData.username = account.username;
        participantData.email = account.email;
        participantData.phone_number = account.phone_number;
      }
    }

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
      where: { event_id: eventId },
      include: [
        { model: Account, attributes: ['id', 'username', 'email', 'phone_number'], as: 'account' } // Tambahkan alias 'account'
      ]
    });
  }
}

module.exports = ParticipantService;