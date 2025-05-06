const { AccountService } = require('../services');
const { AccountDTO } = require('../dtos');
const { ResponseUtil } = require('../utils');

class AccountController {
  static async getAllAccounts(req, res) {
    try {
      const accounts = await AccountService.getAllAccounts();
      return res.json(ResponseUtil.SuccessResponse(accounts));
    } catch (error) {
      console.error('Error getting all accounts:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async getAccountById(req, res) {
    try {
      const id = req.params.id;
      const account = await AccountService.getAccountById(id);
      
      if (!account) {
        return res.json(ResponseUtil.NotFound('Account not found'));
      }
      
      return res.json(ResponseUtil.SuccessResponse(account));
    } catch (error) {
      console.error('Error getting account:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async getAccountByUsername(req, res) {
    try {
      const username = req.params.username;
      const account = await AccountService.getAccountByUsername(username);
      
      if (!account) {
        return res.json(ResponseUtil.NotFound('Account not found'));
      }
      
      return res.json(ResponseUtil.SuccessResponse(account));
    } catch (error) {
      console.error('Error getting account by username:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async createAccount(req, res) {
    try {
      const accountData = req.body;
      
      // Validate input data
      const validationErrors = AccountDTO.validate(accountData);
      if (validationErrors) {
        return res.json(ResponseUtil.UnprocessableEntity(validationErrors));
      }
      
      // Check if account with same username already exists
      const existingAccountByUsername = await AccountService.getAccountByUsername(accountData.username);
      if (existingAccountByUsername) {
        return res.json(ResponseUtil.Conflict('Account with this username already exists'));
      }
      
      const newAccount = await AccountService.createAccount(accountData);
      
      // Hapus password dari response
      const { password, ...accountWithoutPassword } = newAccount.toJSON();
      
      return res.json(ResponseUtil.Created(accountWithoutPassword));
    } catch (error) {
      console.error('Error creating account:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async updateAccount(req, res) {
    try {
      const id = req.params.id;
      const accountData = req.body;
      
      // Validate input data
      const validationErrors = AccountDTO.validate(accountData, true);
      if (validationErrors) {
        return res.json(ResponseUtil.UnprocessableEntity(validationErrors));
      }
      
      // Check if account exists
      const existingAccount = await AccountService.getAccountById(id);
      if (!existingAccount) {
        return res.json(ResponseUtil.NotFound('Account not found'));
      }
      
      // If updating username, check if it's unique
      if (accountData.username && accountData.username !== existingAccount.username) {
        const existingAccountByUsername = await AccountService.getAccountByUsername(accountData.username);
        if (existingAccountByUsername) {
          return res.json(ResponseUtil.Conflict('Account with this username already exists'));
        }
      }
      
      const updatedAccount = await AccountService.updateAccount(id, accountData);
      return res.json(ResponseUtil.SuccessResponse(updatedAccount));
    } catch (error) {
      console.error('Error updating account:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async deleteAccount(req, res) {
    try {
      const id = req.params.id;
      
      // Check if account exists
      const existingAccount = await AccountService.getAccountById(id);
      if (!existingAccount) {
        return res.json(ResponseUtil.NotFound('Account not found'));
      }
      
      await AccountService.deleteAccount(id);
      return res.json(ResponseUtil.SuccessResponse(null, 'Account successfully deleted'));
    } catch (error) {
      console.error('Error deleting account:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }
}

module.exports = AccountController;