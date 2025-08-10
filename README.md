# BudgetWise Backend

## Introduction
BudgetWise is a personal finance backend system that enables users to track expenses, manage budgets and financial goals, receive email notifications, and get AI-driven financial insights. It provides secure authentication, role-based access, analytics, and integrations for currency conversion and notifications, helping users make smarter financial decisions.

## Project Type
Backend

## Deployed App
Backend: https://deployed-backend.example.com
Database: https://cloud.mongodb.com

## Directory Structure
BudgetWise/
├─ src/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ services/
│  ├─ utils/
│  └─ index.js
├─ tests/
├─ .env
├─ package.json
├─ README.md

## Video Walkthrough of the project
_Attach a short video walkthrough of all features here_

## Video Walkthrough of the codebase
_Attach a short video walkthrough of the codebase here_

## Features
- User & Admin roles with JWT authentication
- Expense, Budget, and Goal management (CRUD)
- Analytics and data visualization endpoints
- Email notifications (Nodemailer)
- Currency conversion (Open Exchange Rates)
- AI-driven financial advice (microservice integration)
- RESTful API (Express.js)
- MongoDB/Mongoose ODM
- Testing (Jest/Mocha)

## Design Decisions or Assumptions
- Role-based access: Users manage their own data, admins manage all records
- Passwords are securely hashed with bcrypt
- Email notifications are sent via Nodemailer (Gmail SMTP)
- Currency conversion uses Open Exchange Rates API
- AI/ML microservice is assumed to be running and accessible via HTTP
- All endpoints are prefixed with `/api`

## Installation & Getting started
```bash
# Clone the repository
cd BudgetWise
npm install
# Set up your .env file (see .env.example)
npm run dev
```

## Usage
Use tools like Postman to interact with the API. Register/login to get a JWT, then use it for authenticated requests.

```bash
# Example: Register a user
POST /api/register
{
	"email": "user@example.com",
	"password": "password123",
	"name": "User Name"
}

# Example: Create an expense
POST /api/expenses
Authorization: Bearer <token>
{
	"date": "2025-08-10",
	"amount": 100,
	"category": "Food",
	"currency": "USD"
}
```

## Credentials
- User: user@example.com / password123
- Admin: admin@example.com / adminpass (create manually in DB or via registration, then update role)

## APIs Used
- [Open Exchange Rates](https://openexchangerates.org/)
- [Nodemailer](https://nodemailer.com/about/)
- [Custom AI/ML microservice] (internal)

## API Endpoints
- POST   /api/register - Register user
- POST   /api/login - Login user
- POST   /api/expenses - Create expense
- GET    /api/expenses - List expenses
- PUT    /api/expenses/:id - Update expense
- DELETE /api/expenses/:id - Delete expense
- POST   /api/budgets - Create budget
- GET    /api/budgets - List budgets
- PUT    /api/budgets/:id - Update budget
- DELETE /api/budgets/:id - Delete budget
- POST   /api/goals - Create goal
- GET    /api/goals - List goals
- PUT    /api/goals/:id - Update goal
- DELETE /api/goals/:id - Delete goal
- POST   /api/convert-currency - Convert currency
- GET    /api/analytics/spending-patterns - Spending analytics
- GET    /api/analytics/budget-adherence - Budget analytics
- GET    /api/charts/spending-trends - Spending trend chart data
- GET    /api/charts/budget-performance - Budget performance chart data
- POST   /api/notifications/trigger - Trigger notification (test)
- GET    /api/advice/personalized - Get personalized advice
- GET    /api/insights/ai - Get AI financial insights

## Technology Stack
- Node.js: JavaScript runtime
- Express.js: Web framework
- MongoDB: NoSQL database
- Mongoose: MongoDB ODM
- JWT: Authentication
- Nodemailer: Email notifications
- Jest/Mocha: Testing
- Axios: HTTP requests
- dotenv: Environment variables
- bcryptjs: Password hashing
- cors: CORS middleware