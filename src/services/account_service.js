const { Account } = require('../models');

class AccountService {
  static async getAllAccounts() {
    return await Account.findAll({
      attributes: { exclude: ['password'] } // Tidak menyertakan password dalam respons
    });
  }

  static async getAccountById(id) {
    return await Account.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
  }
  
  static async getAccountByUsername(username) {
    return await Account.findOne({ 
      where: { username },
      attributes: { exclude: ['password'] }
    });
  }

  static async createAccount(accountData) {
    return await Account.create(accountData);
  }

  static async updateAccount(id, accountData) {
    const [updated] = await Account.update(accountData, {
      where: { id },
      individualHooks: true // Pastikan hook beforeUpdate dijalankan untuk hash password
    });
    
    if (updated) {
      return await this.getAccountById(id);
    }
    
    return null;
  }

  static async deleteAccount(id) {
    return await Account.destroy({
      where: { id }
    });
  }

  // Menambahkan method untuk autentikasi
  static async authenticateAccount(username, password) {
    // Dapatkan account dengan password (berbeda dengan method lain yang exclude password)
    const account = await Account.findOne({ where: { username } });
    
    if (!account) {
      return null;
    }
    
    const passwordValid = await account.checkPassword(password);
    if (!passwordValid) {
      return null;
    }
    
    // Jika autentikasi berhasil, return account tanpa password
    const { password: _, ...accountWithoutPassword } = account.get({ plain: true });
    return accountWithoutPassword;
  }
}

module.exports = AccountService;