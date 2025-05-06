# Changelog

## [0.0.2-alpha] - 2025-02-26
### Added
- Standardized response handling (`response_utils.js`)
- Installed dependencies: `bcrypt`, `crypto-js`, `dotenv`, `express`, `mysql2`, `sequelize`
- Added environment variable: `ENCRYPT_KEY` & `APP_HOST` (stored in `.env.example`)
- Password comparison utility (`password_util.js`)
- AES encryption & decryption utility (`encryption_util.js`)
- HTTP status utility (`http_status_util.js`)
- API response documentation added to `README.md`
- Created `app.js` with a basic Express server and route (`/`)
- Created `server.js` to initialize and start the server
- Implemented `ResponseUtil` in `app.js`
- Created `HelloWorldController` to manage responses separately
- Added `hello_world_route.js` to modularize routing
- Introduced `SetupNotFoundHandler()` (`app.js`) to return 404 responses
- Add database connection `database/index.js`
- Implement `ConnectDatabase()` function in `server.js` for automatic DB sync
- Add error handling for database connection

### Changed
- N/A

### Fixed
- N/A

## [0.0.1-alpha] - 2025-02-24
### Added
- Initial project setup

### Changed
- N/A

### Fixed
- N/A