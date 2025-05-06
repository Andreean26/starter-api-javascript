class ParticipantDTO {
  static validate(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate || data.event_id !== undefined) {
      if (!data.event_id || isNaN(Number(data.event_id))) {
        errors.push('Event ID is required and must be a number');
      }
    }

    if (!isUpdate || data.participant_name !== undefined) {
      if (!data.participant_name || typeof data.participant_name !== 'string') {
        errors.push('Participant name is required and must be a string');
      } else if (data.participant_name.length > 100) {
        errors.push('Participant name must be 100 characters or less');
      }
    }

    if (data.email !== undefined && data.email !== null) {
      if (typeof data.email !== 'string') {
        errors.push('Email must be a string');
      } else if (!/^\S+@\S+\.\S+$/.test(data.email) && data.email !== '') {
        errors.push('Email format is invalid');
      } else if (data.email.length > 100) {
        errors.push('Email must be 100 characters or less');
      }
    }

    if (data.phone_number !== undefined && data.phone_number !== null) {
      if (typeof data.phone_number !== 'string') {
        errors.push('Phone number must be a string');
      } else if (data.phone_number.length > 20) {
        errors.push('Phone number must be 20 characters or less');
      }
    }

    if (data.attendance_status !== undefined) {
      const validStatuses = ['confirmed', 'pending', 'declined'];
      if (!validStatuses.includes(data.attendance_status)) {
        errors.push('Attendance status must be one of: confirmed, pending, declined');
      }
    }

    return errors.length > 0 ? errors : null;
  }
}

module.exports = ParticipantDTO;