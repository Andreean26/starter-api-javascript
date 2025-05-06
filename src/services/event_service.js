const { Event, Category, Account } = require('../models');
const { Op } = require('sequelize');

class EventService {
  static async getAllEvents() {
    return await Event.findAll({
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Account, attributes: ['id', 'username', 'email'] }
      ]
    });
  }

  static async getEventById(id) {
    return await Event.findByPk(id, {
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Account, attributes: ['id', 'username', 'email'] }
      ]
    });
  }

  static async createEvent(eventData) {
    return await Event.create(eventData);
  }

  static async updateEvent(id, eventData) {
    const [updated] = await Event.update(eventData, {
      where: { id }
    });
    
    if (updated) {
      return await this.getEventById(id);
    }
    
    return null;
  }

  static async deleteEvent(id) {
    return await Event.destroy({
      where: { id }
    });
  }

  static async getEventsByUsername(username) {
    return await Event.findAll({
      where: { username },
      include: [
        { model: Category, attributes: ['id', 'category_name'] }
      ]
    });
  }

  static async getEventsByCategory(categoryId) {
    return await Event.findAll({
      where: { category_id: categoryId },
      include: [
        { model: Account, attributes: ['id', 'username', 'email'] }
      ]
    });
  }

  static async getUpcomingEvents() {
    const now = new Date();
    return await Event.findAll({
      where: {
        event_start_time: {
          [Op.gt]: now
        }
      },
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Account, attributes: ['id', 'username', 'email'] }
      ],
      order: [['event_start_time', 'ASC']]
    });
  }

  static async getOngoingEvents() {
    const now = new Date();
    return await Event.findAll({
      where: {
        event_start_time: {
          [Op.lte]: now
        },
        event_end_time: {
          [Op.gt]: now
        }
      },
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Account, attributes: ['id', 'username', 'email'] }
      ]
    });
  }
}

module.exports = EventService;