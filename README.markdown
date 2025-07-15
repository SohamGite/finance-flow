# FinanceFlow

FinanceFlow is a personal finance management web application that helps users track their income and expenses, receive AI-powered budgeting suggestions, and earn points for financial activities. Built with a modern tech stack, it provides a user-friendly interface for managing finances and setting financial goals.

## Features

- **User Authentication**: Secure signup and login using JWT-based authentication.
- **Budget Tracker**: Add, view, and categorize income and expense transactions with a monthly filter.
- **AI Financial Advisor**: Powered by the Gemini API, provides personalized budgeting suggestions based on income and expenses.
- **Gamification**: Earn points for adding transactions to encourage consistent financial tracking.
- **Financial Summary**: Visualize income vs. expenses with a bar chart using Chart.js.
- **Goals**:Set and Track financial goals
- **Custom Categories**: Users can add custom categories for transactions.
- **Protected Routes**: Dashboard access restricted to authenticated users.

## Tech Stack

### Backend
- **Node.js & Express**: Server-side framework for API routes.
- **MongoDB & Mongoose**: Database for storing users, transactions, and categories.
- **JWT**: For secure authentication.
- **bcryptjs**: For password hashing.
- **@google/generative-ai**: For AI-powered budgeting suggestions.
- **CORS**: Enables cross-origin requests from the frontend.

### Frontend
- **React**: UI library for building components.
- **React Router**: For client-side routing.
- **Chart.js & react-chartjs-2**: For visualizing financial data.
- **Tailwind CSS**: For styling the UI.
- **Vite**: Build tool for fast development.

## Project Structure

```
FinanceFlow/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   ├── Category.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── transactions.js
│   │   ├── budget.js
│   │   ├── users.js
│   ├── middleware/
│   │   ├── auth.js
│   ├── index.js
│   ├── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BudgetSuggestions.jsx
│   │   │   ├── Points.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   ├── App.jsx
│   ├── public/
│   ├── package.json
├── README.md
```

## Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Git**
- **Gemini API Key** (for AI budgeting suggestions)

## Setup Instructions

### Backend Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/FinanceFlow.git
   cd FinanceFlow/backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `backend/` directory with the following:
   ```env
   MONGODB_URI=mongodb://localhost:27017/financeflow
   JWT_SECRET=your_jwt_secret_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start MongoDB**:
   Ensure MongoDB is running locally or use a MongoDB Atlas URI.

5. **Run the Backend**:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup
1. **Navigate to Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

### Database Setup
- Ensure MongoDB is running (`mongod` for local setup).
- The backend will automatically create the `financeflow` database and collections (`users`, `transactions`, `categories`) when you add data.

## Usage

1. **Sign Up / Log In**:
   - Visit `http://localhost:5173/auth` to create an account or log in.
   - After successful authentication, you’ll be redirected to the dashboard.

2. **Dashboard**:
   - Add transactions (income or expense) with categories, amounts, and descriptions.
   - View transaction history and a bar chart summarizing income vs. expenses.
   - Filter transactions by month using the date picker.
   - Add custom categories for transactions.
   - View AI-powered budgeting suggestions and your earned points.

3. **AI Financial Advisor**:
   - Ask financial questions (e.g., “Can I afford a bike with my 5 LPA salary?”) to receive personalized advice powered by the Gemini API.

4. **Points System**:
   - Earn 10 points for each transaction added.
   - View your points balance on the dashboard.

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Create a new user (requires `name`, `email`, `password`).
- `POST /api/auth/login`: Log in and receive a JWT (requires `email`, `password`).
- `GET /api/auth/me`: Fetch authenticated user’s email and points (requires JWT).

### Transactions
- `POST /api/transactions`: Add a transaction (requires `type`, `category`, `amount`, `description`).
- `GET /api/transactions?month=YYYY-MM`: Fetch transactions, optionally filtered by month.

### Budget
- `GET /api/budget/suggestions`: Get AI-powered budgeting suggestions based on income and expenses.
- `POST /api/budget/advisor`: Ask a financial question and receive AI advice (requires `query`).

### Categories
- `POST /api/categories`: Add a custom category (requires `name`, `type`).
- `GET /api/categories`: Fetch user’s custom categories.

## Planned Features

- **Social Challenges**: Join savings challenges with other users.
- **Micro-Investments**: Integrate with Zerodha/Groww for small-scale investments.
- **Expense Insights**: Analyze spending by category with visual breakdowns.
- **Enhanced Gamification**: Add badges and rewards for achieving financial goals.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, open an issue on GitHub or contact the maintainer at [sohammgite29@gmail.com].