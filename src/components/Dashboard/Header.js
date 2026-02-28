import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useToast } from '../UI/Toast';

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addToast } = useToast();

  const handleLogout = () => {
    dispatch(logout());
    addToast('Logged out successfully', 'info');
  };

  return (
    <header style={{
      height: '60px',
      backgroundColor: '#1e293b',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 25px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button 
          onClick={toggleSidebar}
          style={{
            display: 'block',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '1.4rem',
            cursor: 'pointer',
            padding: '5px',
            color: '#cbd5e1'
          }}
          className="mobile-toggle"
        >
          ☰
        </button>
        <div style={{ 
          fontWeight: 800, 
          fontSize: '1.25rem', 
          letterSpacing: '-0.5px',
          color: '#f8fafc'
        }}>
           Dashboard
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            color: '#fff',
            fontSize: '0.85rem'
          }}>
            {user?.name?.charAt(0) || 'A'}
          </div>
          <span style={{ 
            fontSize: '0.9rem', 
            fontWeight: 500,
            color: '#e2e8f0',
            display: window.innerWidth > 640 ? 'block' : 'none'
          }}>
            {user?.name}
          </span>
        </div>
        
        <button
          onClick={handleLogout}
          style={{
            padding: '6px 16px',
            backgroundColor: 'rgba(241, 245, 249, 0.1)',
            color: '#f1f5f9',
            border: '1px solid rgba(241, 245, 249, 0.2)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(241, 245, 249, 0.2)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(241, 245, 249, 0.1)'}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
