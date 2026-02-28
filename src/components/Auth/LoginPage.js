import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';
import { useToast } from '../UI/Toast';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      addToast('Welcome back!', 'success');
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from, addToast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        padding: '40px',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 900, 
            letterSpacing: '-1px',
            marginBottom: '10px'
          }}>
            Dashboard 
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Sign in to Dashboard</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '8px' }}>Enter your credentials to continue</p>
        </div>

        {error && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#fee2e2', 
            border: '1px solid #fecaca', 
            borderRadius: '8px', 
            color: '#b91c1c', 
            fontSize: '0.85rem', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                boxSizing: 'border-box', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                fontSize: '0.95rem'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                boxSizing: 'border-box', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                fontSize: '0.95rem'
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: 700,
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '8px',
          border: '1px dashed #cbd5e1',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '5px' }}>Demo Account</div>
          <code style={{ fontSize: '0.85rem', color: '#334155' }}>admin@example.com / admin123</code>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
