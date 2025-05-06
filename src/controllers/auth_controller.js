const { AccountService } = require('../services');
const { ResponseUtil } = require('../utils');

class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.json(ResponseUtil.BadRequest('Username and password are required'));
      }
      
      const account = await AccountService.authenticateAccount(username, password);
      
      if (!account) {
        return res.json(ResponseUtil.LoginFailed());
      }
      
      return res.json(ResponseUtil.SuccessResponse({
        account
        // Anda bisa menambahkan token JWT di sini jika mengimplementasikan authentication
        // token: generateJwtToken(account)
      }, 'Login successful'));
    } catch (error) {
      console.error('Error during login:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }
}

module.exports = AuthController;