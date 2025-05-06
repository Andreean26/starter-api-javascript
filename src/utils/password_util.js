const bcrypt = require('bcrypt');

class PasswordUtil {
    static async ComparePasswords(PLAIN_TEXT_PASSWORD, HASHED_PASSWORD) {
        const compare = await bcrypt.compare(PLAIN_TEXT_PASSWORD, HASHED_PASSWORD);

        return compare;
    }
}

module.exports = PasswordUtil;