const HttpStatus = require("./http_status_util");

class ResponseUtil {
    /**
     * ✅ Standardized success response
     * @param {any} DATA - The data to return
     * @param {string} MESSAGE - A success message
     * @param {number} CODE - The HTTP status code (default: 200 OK)
     */
    static SuccessResponse(DATA = null, MESSAGE = "Operation Successful", CODE = HttpStatus.OK) {
        return {
            success: true,
            code: CODE,
            message: MESSAGE,
            data: DATA,
        };
    }

    /**
     * ✅ Resource created successfully
     */
    static Created(DATA = null, MESSAGE = "Resource successfully created") {
        return this.SuccessResponse(DATA, MESSAGE, HttpStatus.CREATED);
    }

    /**
     * ✅ Request was successful but has no content to return
     */
    static NoContent() {
        return null;
    }

    /**
     * ❌ Standardized error response
     * @param {string} MESSAGE - The error message
     * @param {number} CODE - The HTTP status code
     */
    static ErrorResponse(MESSAGE, CODE) {
        return {
            success: false,
            code: CODE,
            message: MESSAGE,
            data: null,
        };
    }

    /**
     * ❌ 400 - Bad Request (Invalid input)
     */
    static BadRequest(MESSAGE = "Bad request, please check your input") {
        return this.ErrorResponse(MESSAGE, HttpStatus.BAD_REQUEST);
    }

    /**
     * ❌ 401 - Unauthorized (User is not authenticated)
     */
    static Unauthorized(MESSAGE = "Unauthorized") {
        return this.ErrorResponse(MESSAGE, HttpStatus.UNAUTHORIZED);
    }

    /**
     * ❌ 401 - Login failed due to incorrect credentials
     */
    static LoginFailed(MESSAGE = "Invalid username or password") {
        return this.Unauthorized(MESSAGE);
    }

    /**
     * ❌ 401 - Token has expired
     */
    static TokenExpired(MESSAGE = "Token has expired, please re-login") {
        return this.Unauthorized(MESSAGE);
    }

    /**
     * ❌ 401 - Token is invalid
     */
    static TokenInvalid(MESSAGE = "Invalid token, please login again") {
        return this.Unauthorized(MESSAGE);
    }

    /**
     * ❌ 403 - Forbidden (User does not have permission)
     */
    static Forbidden(MESSAGE = "You don't have permission to access this resource") {
        return this.ErrorResponse(MESSAGE, HttpStatus.FORBIDDEN);
    }

    /**
     * ❌ 404 - Resource not found
     */
    static NotFound(MESSAGE = "Resource Not Found") {
        return this.ErrorResponse(MESSAGE, HttpStatus.NOT_FOUND);
    }

    /**
     * ❌ 409 - Conflict (e.g., duplicate resource)
     */
    static Conflict(MESSAGE = "Conflict, the resource already exists") {
        return this.ErrorResponse(MESSAGE, HttpStatus.CONFLICT);
    }

    /**
     * ❌ 422 - Unprocessable Entity (Validation failed)
     */
    static UnprocessableEntity(MESSAGE = "Validation failed, please check your input") {
        return this.ErrorResponse(MESSAGE, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    /**
     * ⚠️ 500 - Internal Server Error
     */
    static InternalServerError(MESSAGE = "Internal Server Error") {
        return this.ErrorResponse(MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports = ResponseUtil;