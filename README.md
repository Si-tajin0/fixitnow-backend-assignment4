# 🛠️ FixItNow - Home Services Marketplace Backend API

FixItNow is a robust, scalable, and secure backend API for a home services marketplace. It connects customers with professional technicians for various home services (like plumbing, electrical, cleaning, etc.) and manages the entire booking to payment lifecycle.

## 🔗 Important Links

- **🌍 Live API URL:** [(https://fixitnow-backend-assignment4.vercel.app/)]
- **📄 API Documentation:** [(https://documenter.getpostman.com/view/54905012/2sBYArVt22)]

## 🔐 Admin Credentials (For Testing)

Use the following credentials to explore the Admin features:

- **Email:** admin@fixitnow.com
- **Password:** admin123

## 🚀 Tech Stack

- **Framework:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Zod
- **Payment Gateway:** Stripe

## ⚙️ Key Features

- **Modular Architecture:** Clean and maintainable codebase using feature-based modular pattern.
- **Role-based Access Control (RBAC):** Secure routes for Admin, Technician, and Customer.
- **Advanced Error Handling:** Global error handler with formatted Zod validation errors.
- **Dynamic Filtering:** Search technicians and services by location, rating, price, etc.
- **Stripe Payment Integration:** Dynamic checkout session creation and database status synchronization.
- **Automated Rating System:** Auto-calculates technician's average rating upon receiving a new review.
- **Prisma Transactions:** Ensures data integrity during multi-table updates (e.g., Payment confirmation and Review submission).

## 💻 Local Setup & Installation

Follow these steps to run the project locally on your machine:

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/fixitnow-backend.git
cd fixitnow-backend
```

2. Install dependencies:

npm install

3. Configure Environment Variables:

Create a .env file in the root directory and add the following:

Env
PORT=5001
NODE_ENV="development"
DATABASE_URL="postgresql://username:password@localhost:5432/fixitnow?schema=public"
JWT_ACCESS_SECRET="your_secret_key"
JWT_ACCESS_EXPIRES_IN="1d"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"

4. Run Prisma Migrations:

npx prisma migrate dev
npx prisma generate

5. Start the server:

npm run dev

📜 Available Scripts

npm run dev: Starts the development server using TSX.
npm run build: Compiles TypeScript to JavaScript and generates Prisma client.
npm start: Runs the compiled JavaScript production server.
Developed with ❤️ by [SI TAJIN]
