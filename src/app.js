const express = require('express');
const path = require('path');
const { ResponseUtil } = require("./utils");

const database = require("../database");
const routes = require("./routes");

class App {
    constructor() {
        this.app = express();

        this.SetupMiddleware();
        this.SetupStaticFiles();
        this.SetupRoutes();
        this.SetupNotFoundHandler();
        this.ConnectDatabase();
    }

    SetupMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    SetupStaticFiles() {
        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), 'uploads');
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Serve static files from the uploads directory
        this.app.use('/uploads', express.static(uploadDir));
    }

    SetupRoutes() {
        this.app.use(routes);
    }

    SetupNotFoundHandler() {
        this.app.use((req, res, next) => {
            res.send(ResponseUtil.NotFound());
        });
    }

    async ConnectDatabase() {
        try {
            // Gunakan alter:true untuk memperbarui skema secara otomatis (development only)
            const syncOptions = process.env.NODE_ENV === 'production' ? {} : { alter: true };
            await database.sync(syncOptions);
            console.log('Database synchronized successfully');
        } catch(error) {
            console.error(`\n  [ERROR] Connecting to the database: ${error.message}`);
            console.error('Database connection details:');
            console.error(`  Host: ${process.env.DB_HOST}`);
            console.error(`  Database: ${process.env.DB_DATABASE}`);
            console.error(`  Username: ${process.env.DB_USERNAME}`);
            console.error('Please check your database configuration and make sure MySQL server is running.');
        }
    }

    GetServer() {
        return this.app;
    }
}

module.exports = App;