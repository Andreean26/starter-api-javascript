class AccountDTO {
  static validate(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate || data.username !== undefined) {
      if (!data.username || typeof data.username !== 'string') {
        errors.push('Username is required and must be a string');
      } else if (data.username.length > 50) {
        errors.push('Username must be 50 characters or less');
      }
    }

    if (!isUpdate || data.email !== undefined) {
      if (!data.email || typeof data.email !== 'string') {
        errors.push('Email is required and must be a string');
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.push('Email format is invalid');
      } else if (data.email.length > 100) {
        errors.push('Email must be 100 characters or less');
      }
    }
    
    // Validasi password baru
    if (!isUpdate || data.password !== undefined) {
      if (!data.password || typeof data.password !== 'string') {
        errors.push('Password is required and must be a string');
      } else if (data.password.length < 6) {
        errors.push('Password must be at least 6 characters');
      } else if (data.password.length > 100) {
        errors.push('Password must be 100 characters or less');
      }
    }

    if (data.phone_number !== undefined && data.phone_number !== null) {
      if (typeof data.phone_number !== 'string') {
        errors.push('Phone number must be a string');
      } else if (data.phone_number.length > 20) {
        errors.push('Phone number must be 20 characters or less');
      }
    }

    return errors.length > 0 ? errors : null;
  }
}

module.exports = AccountDTO;