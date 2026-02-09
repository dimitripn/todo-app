# 📝 TODO App Backend

A simple RESTful API for managing users authentication and tasks, built with **Node.js, Express, Sequelize, and JWT**.

> ⚠️ **This project is built for learning purposes.**  
> It is created to practice backend architecture, authentication, and REST API development.  
> Not intended for production use (yet).

---

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Password Hashing (bcrypt)
- Protected Routes with Middleware
- CRUD Tasks (Create, Read, Update, Delete)
- Sequelize ORM (SQL Database)
- Environment Configuration with `.env`

---

## 🧠 Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- JWT (Authentication)
- bcrypt (Password Hashing)
- dotenv

---

## ⚙️ Installation

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd todo-app-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy .env.example to .env and fill in:
```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=your_jwt_secret_here
```

---

## ▶️ Running the Server

### Development
```
npm run dev
```

### Production
```
npm start
```

Server will run at:
```
http://localhost:3000
```

