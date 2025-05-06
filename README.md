# ⚙ Starter API JavaScript
Express.js starter template with a modular structure for easy scalability.

## 📂 Project Structure
```
/starter-api-javascript
│── database/
│ │── migrations/
│ │── seeders/
│ └── index.js
│── src/
│ │── controllers/
│ │── dtos/
│ │── routes/
│ │── middlewares/
│ │── models/
│ │── repositories/
│ │── utils/
│ │── app.js
│ └── server.js
│── test/
│── .env.example
│── .gitignore
│── CHANGELOG.md
│── LICENSE
│── package.json
└── README.md
```

## 🚀 Setup
### 1️⃣ Install dependencies
```sh
npm install
```

### 2️⃣ Set up environment variables
Copy `.env.example` to `.env`  
```sh
cp .env.example .env
```
Don't forget to change these variable values:
- `ACCESS_TOKEN_JWT_SECRET`
- `REFRESH_TOKEN_JWT_SECRET`
- `ENCRYPT_KEY`

### 3️⃣ Run the application
```sh
npm start
```

## API Response Documentation
### 🔨 HTTP Status Codes
```
{
  "200": "OK - The request was successful.",
  "201": "Created - The resource was successfully created.",
  "202": "Accepted - The request has been accepted for processing but is not completed.",
  "204": "No Content - The request was successful, but there is no content to return.",
  "400": "Bad Request - The request could not be understood due to invalid syntax.",
  "401": "Unauthorized - Authentication is required and has failed or has not been provided.",
  "403": "Forbidden - The client does not have access rights to the content.",
  "404": "Not Found - The server could not find the requested resource.",
  "409": "Conflict - The request conflicts with the current state of the resource.",
  "422": "Unprocessable Entity - The request was well-formed but contained invalid data.",
  "500": "Internal Server Error - A generic error message when the server fails to process the request.",
  "503": "Service Unavailable - The server is not ready to handle the request.",
}
```

### ✅ Success Responses
200 OK
```
{
    "success": true,
    "code": 200,
    "message": "Operation Successful",
    "data": { /* your data here */ }
}
```

201 Created
```
{
    "success": true,
    "code": 201,
    "message": "Resource successfully created",
    "data": { /* created resource */ }
}
```

204 No Content
```
HTTP/1.1 204 No Content
```

### ❌ Client Error Responses
400 Bad Request
```
{
    "success": false,
    "code": 400,
    "message": "Bad request, please check your input",
    "data": null
}
```

401 Unauthorized
```
{
    "success": false,
    "code": 401,
    "message": "Unauthorized",
    "data": null
}
```

403 Forbidden
```
{
    "success": false,
    "code": 403,
    "message": "You don't have permission to access this resource",
    "data": null
}
```

404 Not Found
```
{
    "success": false,
    "code": 404,
    "message": "Resource Not Found",
    "data": null
}
```

409 Conflict
```
{
    "success": false,
    "code": 409,
    "message": "Conflict, the resource already exists",
    "data": null
}
```

422 Unprocessable Entity
```
{
    "success": false,
    "code": 422,
    "message": "Validation failed, please check your input",
    "data": null
}
```

### ⚠️ Server Error Responses
500 Internal Server Error
```
{
    "success": false,
    "code": 500,
    "message": "Internal Server Error",
    "data": null
}
```