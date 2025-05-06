const { AccountService } = require('../services');
const { ResponseUtil } = require('../utils');
const jwt = require('jsonwebtoken');

class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // Validasi input
      if (!username || !password) {
        return res.json(ResponseUtil.BadRequest('Username dan password diperlukan'));
      }
      
      // Autentikasi dengan AccountService
      const account = await AccountService.authenticateAccount(username, password);
      
      if (!account) {
        return res.json(ResponseUtil.LoginFailed('Username atau password salah'));
      }

      // Generate token JWT
      const accessToken = jwt.sign(
        {
          id: account.id,
          username: account.username,
          email: account.email
        },
        process.env.ACCESS_TOKEN_JWT_SECRET || 'your-fallback-secret-key',
        {
          expiresIn: process.env.ACCESS_TOKEN_JWT_EXPIRES_IN || '15m',
          issuer: process.env.JWT_ISSUER || 'starter-api',
          audience: process.env.JWT_AUDIENCE || 'starter-client'
        }
      );

      const refreshToken = jwt.sign(
        { id: account.id },
        process.env.REFRESH_TOKEN_JWT_SECRET || 'your-fallback-refresh-secret',
        {
          expiresIn: process.env.REFRESH_TOKEN_JWT_EXPIRES_IN || '7d'
        }
      );
      
      return res.json(ResponseUtil.SuccessResponse({
        account,
        accessToken,
        refreshToken
      }, 'Login berhasil'));
    } catch (error) {
      console.error('Error pada login:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.json(ResponseUtil.BadRequest('Refresh token diperlukan'));
      }
      
      // Verifikasi refresh token
      let decoded;
      try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET || 'your-fallback-refresh-secret');
      } catch (err) {
        return res.json(ResponseUtil.TokenInvalid());
      }

      // Dapatkan account berdasarkan ID dari token
      const account = await AccountService.getAccountById(decoded.id);
      
      if (!account) {
        return res.json(ResponseUtil.Unauthorized('Account tidak ditemukan'));
      }

      // Generate token baru
      const newAccessToken = jwt.sign(
        {
          id: account.id,
          username: account.username,
          email: account.email
        },
        process.env.ACCESS_TOKEN_JWT_SECRET || 'your-fallback-secret-key',
        {
          expiresIn: process.env.ACCESS_TOKEN_JWT_EXPIRES_IN || '15m',
          issuer: process.env.JWT_ISSUER || 'starter-api',
          audience: process.env.JWT_AUDIENCE || 'starter-client'
        }
      );
      
      return res.json(ResponseUtil.SuccessResponse({
        accessToken: newAccessToken
      }, 'Token berhasil diperbarui'));
    } catch (error) {
      console.error('Error pada refresh token:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }

  static async getCurrentUser(req, res) {
    try {
      // user sudah tersedia dari middleware auth
      const user = req.user;
      
      if (!user) {
        return res.json(ResponseUtil.Unauthorized('User tidak ditemukan'));
      }
      
      // Ambil data terbaru dari database
      const account = await AccountService.getAccountById(user.id);
      
      return res.json(ResponseUtil.SuccessResponse({ account }));
    } catch (error) {
      console.error('Error mendapatkan data user:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }
}

module.exports = AuthController;