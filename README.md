# Finance Dashboard Backend

A backend system for managing financial records with role-based access control and analytics. This project simulates a real-world finance tracking system with secure APIs, structured data handling, and analytical insights.

---

## 🚀 Tech Stack

* **Backend:** Node.js, Express.js
* **Language:** TypeScript
* **Database:** PostgreSQL (Neon)
* **ORM:** Prisma
* **Authentication:** JWT (JSON Web Token)
* **Validation:** Zod
* **API Testing:** Postman

---

## 🔐 Features

### Authentication & Authorization

* User registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Role-Based Access Control (RBAC)

  * VIEWER → read-only access
  * ANALYST → analytics access
  * ADMIN → full access

---

### 📊 Financial Records

* Create, update, delete records
* Soft delete (isDeleted flag)
* Filter records:

  * by type (INCOME / EXPENSE)
  * by category
* Pagination support (`page`, `limit`)
* Search functionality (case-insensitive)

---

### 📈 Dashboard Summary

* Total income and expenses
* Net balance calculation
* Category-wise breakdown (income vs expense)
* Monthly trends (income vs expense per month)
* Date range filtering

---

### ✅ Validation (Zod)

* Input validation using Zod schemas
* Validates:

  * request body (records, auth)
  * query parameters (summary)
* Prevents invalid or malformed API requests

---

## 📡 API Endpoints

### 🔐 Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

---

### 📊 Records

* `POST /api/records` → Create record
* `GET /api/records` → Fetch records
* `PUT /api/records/:id` → Update record
* `DELETE /api/records/:id` → Soft delete

#### Query Parameters

* `type=INCOME`
* `category=Food`
* `page=1&limit=5`
* `search=food`

---

### 📈 Summary

* `GET /api/summary`

#### Query Parameters

* `startDate=YYYY-MM-DD`
* `endDate=YYYY-MM-DD`

---

## 🧪 Example Request

```json
{
  "amount": 5000,
  "type": "INCOME",
  "category": "Salary",
  "date": "2026-04-01"
}
```

---

## 📊 Example Response

```json
{
  "totalIncome": 150000,
  "totalExpense": 5000,
  "balance": 145000,
  "categoryBreakdown": {
    "Salary": {
      "income": 100000,
      "expense": 0
    }
  },
  "monthlyTrends": {
    "2026-04": {
      "income": 100000,
      "expense": 5000
    }
  }
}
```

---

## ⚙️ Setup Instructions

### 1. Clone repository

```bash
git clone <repo-url>
cd finance-dashboard-backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create `.env` file

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

### 4. Run migrations

```bash
npx prisma migrate dev
```

---

### 5. Start server

```bash
npm run dev
```

---

## 🧠 Design Decisions

* PostgreSQL used for structured financial data
* Prisma for clean database abstraction
* JWT for stateless authentication
* Middleware-based RBAC for security
* Zod for validation and input safety
* Soft delete to preserve historical data
* Aggregation handled in service layer

---

## 📌 Assumptions

* Users can access only their own records
* Date filtering requires both startDate and endDate
* Single currency system
* No external integrations

---

## 🔮 Future Improvements

* Refresh tokens for authentication
* Rate limiting and security enhancements
* Redis caching for performance
* Prisma groupBy for optimized aggregation
* Swagger API documentation
* Unit and integration testing

---

## 🎯 Conclusion

This project demonstrates backend engineering concepts such as secure API design, authentication, authorization, validation, data modeling, and analytical processing aligned with real-world fintech applications.
