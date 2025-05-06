const { EventService, AccountService, CategoryService } = require('../services');
const { EventDTO } = require('../dtos');
const { ResponseUtil } = require('../utils');
const path = require('path');

class EventController {
  static async getAllEvents(req, res) {
    try {
      const events = await EventService.getAllEvents();
      return res.json(ResponseUtil.SuccessResponse(events));
    } catch (error) {
      console.error('Error getting all events:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async getEventById(req, res) {
    try {
      const id = req.params.id;
      const event = await EventService.getEventById(id);
      
      if (!event) {
        return res.json(ResponseUtil.NotFound('Event not found'));
      }
      
      return res.json(ResponseUtil.SuccessResponse(event));
    } catch (error) {
      console.error('Error getting event:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async createEvent(req, res) {
    try {
      const eventData = req.body;
      
      // Validate input data
      const validationErrors = EventDTO.validate(eventData);
      if (validationErrors) {
        return res.json(ResponseUtil.UnprocessableEntity(validationErrors));
      }
      
      // Check if account exists
      const account = await AccountService.getAccountByUsername(eventData.username);
      if (!account) {
        return res.json(ResponseUtil.UnprocessableEntity('Account with this username does not exist'));
      }
      
      // Check if category exists
      const category = await CategoryService.getCategoryById(eventData.category_id);
      if (!category) {
        return res.json(ResponseUtil.UnprocessableEntity('Category with this ID does not exist'));
      }
      
      const newEvent = await EventService.createEvent(eventData);
      
      // Fetch the newly created event with its relationships
      const createdEvent = await EventService.getEventById(newEvent.id);
      return res.json(ResponseUtil.Created(createdEvent));
    } catch (error) {
      console.error('Error creating event:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async updateEvent(req, res) {
    try {
      const id = req.params.id;
      const eventData = req.body;
      
      // Validate input data
      const validationErrors = EventDTO.validate(eventData, true);
      if (validationErrors) {
        return res.json(ResponseUtil.UnprocessableEntity(validationErrors));
      }
      
      // Check if event exists
      const existingEvent = await EventService.getEventById(id);
      if (!existingEvent) {
        return res.json(ResponseUtil.NotFound('Event not found'));
      }
      
      // If username is being updated, check if the new account exists
      if (eventData.username) {
        const account = await AccountService.getAccountByUsername(eventData.username);
        if (!account) {
          return res.json(ResponseUtil.UnprocessableEntity('Account with this username does not exist'));
        }
      }
      
      // If category_id is being updated, check if the new category exists
      if (eventData.category_id) {
        const category = await CategoryService.getCategoryById(eventData.category_id);
        if (!category) {
          return res.json(ResponseUtil.UnprocessableEntity('Category with this ID does not exist'));
        }
      }
      
      const updatedEvent = await EventService.updateEvent(id, eventData);
      return res.json(ResponseUtil.SuccessResponse(updatedEvent));
    } catch (error) {
      console.error('Error updating event:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async deleteEvent(req, res) {
    try {
      const id = req.params.id;
      
      // Check if event exists
      const existingEvent = await EventService.getEventById(id);
      if (!existingEvent) {
        return res.json(ResponseUtil.NotFound('Event not found'));
      }
      
      await EventService.deleteEvent(id);
      return res.json(ResponseUtil.SuccessResponse(null, 'Event successfully deleted'));
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async getEventsByUsername(req, res) {
    try {
      const username = req.params.username;
      
      // Check if account exists
      const account = await AccountService.getAccountByUsername(username);
      if (!account) {
        return res.json(ResponseUtil.NotFound('Account not found'));
      }
      
      const events = await EventService.getEventsByUsername(username);
      return res.json(ResponseUtil.SuccessResponse(events));
    } catch (error) {
      console.error('Error getting events by username:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async getEventsByCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      
      // Check if category exists
      const category = await CategoryService.getCategoryById(categoryId);
      if (!category) {
        return res.json(ResponseUtil.NotFound('Category not found'));
      }
      
      const events = await EventService.getEventsByCategory(categoryId);
      return res.json(ResponseUtil.SuccessResponse(events));
    } catch (error) {
      console.error('Error getting events by category:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  // Menambahkan method yang hilang untuk upload image
  static async uploadEventImage(req, res) {
    try {
      const id = req.params.id;
      
      // Check if event exists
      const existingEvent = await EventService.getEventById(id);
      if (!existingEvent) {
        return res.json(ResponseUtil.NotFound('Event not found'));
      }
      
      // If no file was uploaded
      if (!req.file) {
        return res.json(ResponseUtil.BadRequest('No image file uploaded'));
      }
      
      // Generate the image URL
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
      
      // Update the event with the new image URL
      const updatedEvent = await EventService.updateEvent(id, { image_url: imageUrl });
      
      return res.json(ResponseUtil.SuccessResponse(updatedEvent, 'Image uploaded successfully'));
    } catch (error) {
      console.error('Error uploading event image:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }
}

module.exports = EventController;