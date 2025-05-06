class EventDTO {
  static validate(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate || data.username !== undefined) {
      if (!data.username || typeof data.username !== 'string') {
        errors.push('Username is required and must be a string');
      }
    }

    if (!isUpdate || data.category_id !== undefined) {
      if (!data.category_id || isNaN(Number(data.category_id))) {
        errors.push('Category ID is required and must be a number');
      }
    }

    if (!isUpdate || data.event_name !== undefined) {
      if (!data.event_name || typeof data.event_name !== 'string') {
        errors.push('Event name is required and must be a string');
      } else if (data.event_name.length > 200) {
        errors.push('Event name must be 200 characters or less');
      }
    }

    // Validasi event_start_time
    if (!isUpdate || data.event_start_time !== undefined) {
      if (!data.event_start_time) {
        errors.push('Event start time is required');
      } else {
        const timestamp = Date.parse(data.event_start_time);
        if (isNaN(timestamp)) {
          errors.push('Event start time must be a valid date');
        }
      }
    }

    // Validasi event_end_time
    if (!isUpdate || data.event_end_time !== undefined) {
      if (!data.event_end_time) {
        errors.push('Event end time is required');
      } else {
        const endTimestamp = Date.parse(data.event_end_time);
        if (isNaN(endTimestamp)) {
          errors.push('Event end time must be a valid date');
        } else if (data.event_start_time) {
          const startTimestamp = Date.parse(data.event_start_time);
          if (!isNaN(startTimestamp) && endTimestamp <= startTimestamp) {
            errors.push('Event end time must be after start time');
          }
        }
      }
    }

    if (!isUpdate || data.location !== undefined) {
      if (!data.location || typeof data.location !== 'string') {
        errors.push('Location is required and must be a string');
      } else if (data.location.length > 255) {
        errors.push('Location must be 255 characters or less');
      }
    }

    if (data.number_people !== undefined) {
      const numPeople = Number(data.number_people);
      if (isNaN(numPeople) || numPeople < 1) {
        errors.push('Number of people must be a positive number');
      }
    }

    if (data.description !== undefined && data.description !== null) {
      if (typeof data.description !== 'string') {
        errors.push('Description must be a string');
      }
    }

    if (data.image_url !== undefined && data.image_url !== null) {
      if (typeof data.image_url !== 'string') {
        errors.push('Image URL must be a string');
      } else if (data.image_url.length > 255) {
        errors.push('Image URL must be 255 characters or less');
      }
    }

    return errors.length > 0 ? errors : null;
  }
}

module.exports = EventDTO;