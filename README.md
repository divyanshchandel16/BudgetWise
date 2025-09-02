# BudgetWise Backend

## Introduction
BudgetWise is a personal finance backend system that enables users to track expenses, manage budgets and financial goals, receive email notifications, and get AI-driven financial insights. It provides secure authentication, role-based access, analytics, and integrations for currency conversion and notifications, helping users make smarter financial decisions.

## Project Type
Backend

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
- Security headers (helmet)
- Logging (morgan)
- Rate limiting (express-rate-limit)
- Health check endpoint (`/health`)

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
# Set up your .env file (see .env section below)
npm run dev
```

### .env file example
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/budgetwise
JWT_SECRET=changeme_super_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EXCHANGE_API_KEY=put_your_exchange_api_key_here
AI_SERVICE_URL=http://localhost:5001
```

## Usage
Use tools like Postman to interact with the API. Register/login to get a JWT, then use it for authenticated requests.

```bash
Register
POST {{baseUrl}}/register

Body (JSON):
{
"email": "user1@example.com",
"password": "password123",
"name": "User One"
}

Login
POST {{baseUrl}}/login

Body (JSON):
{
"email": "user1@example.com",
"password": "password123",
"name": "User One"
}

Create Expense
POST {{baseUrl}}/expenses

Body (JSON):
{
"date": "2025-08-10",
"amount": 100,
"category": "Food",
"description": "Lunch",
"currency": "USD"
}

List Expenses(w pagination)
GET {{baseUrl}}/expenses?page=1&limit=50

Update Expense
PUT {{baseUrl}}/expenses/{{expenseId}}

Body (JSON):
{
"amount": 120,
"description": "Lunch with dessert"
}

Delete Expense
DELETE {{baseUrl}}/expenses/{{expenseId}}

Create Budget
POST {{baseUrl}}/budgets

Body (JSON):
{
"category": "Food",
"limit": 500,
"start_date": "2025-08-01",
"end_date": "2025-08-31"
}

List Budget
GET {{baseUrl}}/budgets?page=1&limit=50

Update Budget
PUT {{baseUrl}}/budgets/{{budgetId}}

Body (JSON):
{
"limit": 600
}

Delete Budget
DELETE {{baseUrl}}/budgets/{{budgetId}}

Create Goal
Create goal:

POST {{baseUrl}}/goals

Body (JSON):
{
"goal_type": "Emergency Fund",
"target_amount": 2000,
"deadline": "2025-12-31"
}

List Goal
GET {{baseUrl}}/goals?page=1&limit=50

Update Goal
PUT {{baseUrl}}/goals/{{goalId}}

Body (JSON):
{
"target_amount": 2500
}

Delete Goal
DELETE {{baseUrl}}/goals/{{goalId}}

Get Spending Patterns
GET {{baseUrl}}/analytics/spending-patterns

Get Budget Adherence
GET {{baseUrl}}/analytics/budget-adherence

Get Spending Trend Chart
GET {{baseUrl}}/charts/spending-trends

Get Budget Adherence Chart
GET {{baseUrl}}/charts/budget-performance

Currency Conversion
POST {{baseUrl}}/convert-currency

Body (JSON):
{
"amount": 100,
"from_currency": "USD",
"to_currency": "EUR"
}

Notification Nodemailer
POST {{baseUrl}}/notifications/trigger

Body (JSON):
{
"type": "Budget Alert",
"trigger": "Food budget reached 80%"
}

AI Personalized Advice
GET {{baseUrl}}/advice/personalized

AI Insight
GET {{baseUrl}}/insights/ai

	
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
- helmet: Security headers
- morgan: Logging
- express-rate-limit: Rate limiting
