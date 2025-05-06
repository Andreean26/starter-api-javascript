const CryptoJS = require('crypto-js');

class EncryptionUtil {
    static ENCRYPT_KEY = process.env.ENCRYPT_KEY;

    static Encrypt(data) {
        const key = CryptoJS.enc.Hex.parse(this.ENCRYPT_KEY);
        const encrypted = CryptoJS.AES.encrypt(data.toString(), key, { mode: CryptoJS.mode.ECB });

        return encrypted.toString();
    }

    static Decrypt(data) {
        const key = CryptoJS.enc.Hex.parse(this.ENCRYPT_KEY);
        const decrypted = CryptoJS.AES.decrypt(data, key, { mode: CryptoJS.mode.ECB });

        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}

module.exports = EncryptionUtil;