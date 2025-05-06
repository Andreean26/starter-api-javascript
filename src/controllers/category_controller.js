const { CategoryService } = require('../services');
const { CategoryDTO } = require('../dtos');
const { ResponseUtil } = require('../utils');

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      return res.json(ResponseUtil.SuccessResponse(categories));
    } catch (error) {
      console.error('Error getting all categories:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async getCategoryById(req, res) {
    try {
      const id = req.params.id;
      const category = await CategoryService.getCategoryById(id);
      
      if (!category) {
        return res.json(ResponseUtil.NotFound('Category not found'));
      }
      
      return res.json(ResponseUtil.SuccessResponse(category));
    } catch (error) {
      console.error('Error getting category:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async createCategory(req, res) {
    try {
      const categoryData = req.body;
      
      // Validate input data
      const validationErrors = CategoryDTO.validate(categoryData);
      if (validationErrors) {
        return res.json(ResponseUtil.UnprocessableEntity(validationErrors));
      }
      
      const newCategory = await CategoryService.createCategory(categoryData);
      return res.json(ResponseUtil.Created(newCategory));
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.json(ResponseUtil.Conflict('Category with this name already exists'));
      }
      
      console.error('Error creating category:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async updateCategory(req, res) {
    try {
      const id = req.params.id;
      const categoryData = req.body;
      
      // Validate input data
      const validationErrors = CategoryDTO.validate(categoryData, true);
      if (validationErrors) {
        return res.json(ResponseUtil.UnprocessableEntity(validationErrors));
      }
      
      // Check if category exists
      const existingCategory = await CategoryService.getCategoryById(id);
      if (!existingCategory) {
        return res.json(ResponseUtil.NotFound('Category not found'));
      }
      
      const updatedCategory = await CategoryService.updateCategory(id, categoryData);
      return res.json(ResponseUtil.SuccessResponse(updatedCategory));
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.json(ResponseUtil.Conflict('Category with this name already exists'));
      }
      
      console.error('Error updating category:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async deleteCategory(req, res) {
    try {
      const id = req.params.id;
      
      // Check if category exists
      const existingCategory = await CategoryService.getCategoryById(id);
      if (!existingCategory) {
        return res.json(ResponseUtil.NotFound('Category not found'));
      }
      
      await CategoryService.deleteCategory(id);
      return res.json(ResponseUtil.SuccessResponse(null, 'Category successfully deleted'));
    } catch (error) {
      console.error('Error deleting category:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }
}

module.exports = CategoryController;