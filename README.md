# 📊 Order Management Dashboard

A modern, high-performance **Order Management Dashboard** built with **React** and **Redux Toolkit**. This application provides a order management experience with real-time analytics, advanced order filtering, and high-performance data handling.

---

## 🚀 Key Features

### 1. **Dashboard Overview**
- **Real-time Analytics**: Visual summary of Total Orders, Revenue (formatted in INR), Pending, and Completed orders.
- **Quick Insights**: Dynamic stats cards with smooth hover animations and transition effects.

### 2. **Advanced Order Management**
- **High-Performance Listing**: Utilizes  for list virtualization, ensuring smooth performance even with thousands of orders.
- **Powerful Filtering**: Filter orders by status (Pending, Delivered, Shipped, Cancelled), search by customer/ID, and filter by date range.
- **Bulk Actions**: Select multiple orders to update their status or delete them simultaneously.
- **Individual Actions**: Edit order details or remove specific orders with immediate feedback.

### 3. **Robust State Management**
- **Optimistic Updates**: UI updates instantly when changes are made, with automatic rollback functionality if the API request fails.
- **Redux Toolkit**: Centralized state management for orders and authentication using modern slices and async thunks.

### 4. **User Experience & UI**
- **Authentication**: Secure login flow with protected routing.
- **Responsive Design**: Sidebar-based navigation that works seamlessly across desktop and mobile devices.
- **Toast Notifications**: Interactive feedback system for success and error states.
- **Pagination**: Efficiently navigate through large sets of order data.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Performance**: [React Window](https://github.com/bvaughn/react-window) (Virtualization)
- **Utilities**: `date-fns`, `lodash`
- **Styling**: Modern CSS-in-JS patterns for modular and maintainable styles.

---

## 📂 Project Structure

```
src/
├── app/            # Redux store configuration
├── components/     # UI Components (Auth, Dashboard, Orders, UI)
├── features/       # Redux Slices & Logic (Auth, Orders)
├── hooks/          # Custom React hooks
├── mock/           # Mock API implementation
├── routes/         # Route protection logic
├── utils/          # Helper functions & formatters
└── App.js          # Main application component & routing
```

---

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000` or host in vercel netlify.

---

## 📜 Available Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run eject`: Removes the single build dependency from your project.

---