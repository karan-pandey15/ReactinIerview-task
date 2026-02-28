import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import LoginPage from './components/Auth/LoginPage';
import { ToastProvider } from './components/UI/Toast';
 
const OrdersPage = lazy(() => import('./components/Orders/OrdersPage'));
const DashboardHome = lazy(() => import('./components/Dashboard/DashboardHome'));

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Router>
          <Suspense fallback={<div style={{ padding: '50px', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>Loading dashboard...</div>}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardHome />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/orders" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <OrdersPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />

              <Route path="/settings" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <div style={{ padding: '20px' }}>
                      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>Settings</h1>
                      <div style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #dee2e6' }}>
                        <p style={{ color: '#666' }}>Configuration and user settings implementation is coming soon.</p>
                      </div>
                    </div>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </ToastProvider>
    </Provider>
  );
}

export default App;
