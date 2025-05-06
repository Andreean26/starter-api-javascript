class CategoryDTO {
  static validate(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate || data.category_name !== undefined) {
      if (!data.category_name || typeof data.category_name !== 'string') {
        errors.push('Category name is required and must be a string');
      } else if (data.category_name.length > 100) {
        errors.push('Category name must be 100 characters or less');
      }
    }

    return errors.length > 0 ? errors : null;
  }
}

module.exports = CategoryDTO;