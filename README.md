# E-commerce Node.js API

A RESTful E-commerce API built with **Node.js**, **Express.js**, and **MongoDB**.

This project provides a scalable backend for an e-commerce application, including category management, product management, authentication, and other essential e-commerce functionalities.

## 🚀 Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* dotenv
* Morgan
* express-async-handler

## 📁 Project Structure

```text
E-commerce-NodeJs/
│
├── config/
│   └── database.js
│
├── models/
│
├── routes/
│
├── services/
│
├── middlewares/
│
├── config.env
├── server.js
├── package.json
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/USERNAME/E-commerce-NodeJs.git
```

Navigate to the project:

```bash
cd E-commerce-NodeJs
```

Install dependencies:

```bash
npm install
```

## 🔐 Environment Variables

Create a `config.env` file in the root directory:

```env
NODE_ENV=development
PORT=8000
DB_URI=your_mongodb_connection_string
```

Replace the values with your own configuration.

> **Note:** Do not commit your `config.env` file if it contains sensitive information.

## ▶️ Running the Project

For development:

```bash
npm run start:dev
```

Or:

```bash
nodemon server.js
```

The API will run on:

```text
http://localhost:8000
```

## 📌 API Endpoints

### Categories

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| GET    | `/api/v1/categories` | Get all categories    |
| POST   | `/api/v1/categories` | Create a new category |

### Example: Create Category

**POST**

```text
/api/v1/categories
```

Request body:

```json
{
  "name": "Electronics"
}
```

Example response:

```json
{
  "name": "Electronics",
  "slug": "electronics"
}
```

## 🛠️ Features

* RESTful API architecture
* MongoDB database integration
* Mongoose models and schemas
* Category management
* Automatic slug generation
* Environment configuration using dotenv
* Centralized error handling
* Async error handling
* HTTP request logging with Morgan
* Scalable project structure

## 🔮 Future Improvements

* User authentication and authorization
* Product management
* Shopping cart
* Orders and checkout
* Reviews and ratings
* Product filtering and searching
* Pagination
* Advanced error handling
* API documentation with Swagger

## 👨‍💻 Author

**Ziad Tharwat**

## 📄 License

This project is for learning and development purposes.
