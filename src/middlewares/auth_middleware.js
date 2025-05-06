const jwt = require('jsonwebtoken');
const { ResponseUtil } = require('../utils');

class AuthMiddleware {
  static authenticate(req, res, next) {
    try {
      // Dapatkan token dari header Authorization
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.json(ResponseUtil.Unauthorized('Token tidak ditemukan'));
      }
      
      // Format token: "Bearer [token]"
      const token = authHeader.split(' ')[1];
      
      if (!token) {
        return res.json(ResponseUtil.Unauthorized('Token tidak valid'));
      }
      
      // Verifikasi token
      jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_JWT_SECRET || 'your-fallback-secret-key',
        (err, decoded) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              return res.json(ResponseUtil.TokenExpired());
            }
            return res.json(ResponseUtil.TokenInvalid());
          }
          
          // Berhasil - simpan data user di request object
          req.user = decoded;
          next();
        }
      );
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      return res.json(ResponseUtil.InternalServerError());
    }
  }
}

module.exports = AuthMiddleware;