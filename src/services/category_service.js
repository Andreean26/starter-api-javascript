const { Category } = require('../models');

class CategoryService {
  static async getAllCategories() {
    return await Category.findAll();
  }

  static async getCategoryById(id) {
    return await Category.findByPk(id);
  }

  static async createCategory(categoryData) {
    return await Category.create(categoryData);
  }

  static async updateCategory(id, categoryData) {
    const [updated] = await Category.update(categoryData, {
      where: { id }
    });
    
    if (updated) {
      return await this.getCategoryById(id);
    }
    
    return null;
  }

  static async deleteCategory(id) {
    return await Category.destroy({
      where: { id }
    });
  }
}

module.exports = CategoryService;