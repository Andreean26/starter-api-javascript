const { ResponseUtil } = require('../utils');

class HelloWorldController {
    static async Answer(_, res) {
        return res.send(ResponseUtil.SuccessResponse("Hello World!"));
    }
}

module.exports = HelloWorldController;