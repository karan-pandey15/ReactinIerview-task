import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const menuItems = [
    { name: 'Dashboard Home', path: '/dashboard', icon: '📊' },
    { name: 'Manage Orders', path: '/orders', icon: '🛒' },
  ];

  const sidebarStyle = {
    width: '260px',
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    height: 'calc(100vh - 60px)',
    position: 'fixed',
    left: isOpen ? '0' : '-260px',
    top: '60px',
    overflowY: 'auto',
    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 900,
    boxShadow: '4px 0 10px rgba(0,0,0,0.05)',
    borderRight: '1px solid #1e293b'
  };

  return (
    <>
      {isOpen && (
        <div 
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(2px)',
            zIndex: 850,
            display: window.innerWidth <= 768 ? 'block' : 'none'
          }}
        />
      )}
      <aside style={sidebarStyle}>
        <div style={{ padding: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#475569' }}>
          Navigation
        </div>
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) closeSidebar();
              }}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 20px',
                color: isActive ? '#f8fafc' : '#94a3b8',
                textDecoration: 'none',
                backgroundColor: isActive ? '#1e293b' : 'transparent',
                borderLeft: isActive ? '4px solid #38bdf8' : '4px solid transparent',
                fontSize: '0.95rem',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s ease'
              })}
              onMouseOver={(e) => {
                if (!e.currentTarget.classList.contains('active')) {
                  e.currentTarget.style.backgroundColor = '#1e293b';
                  e.currentTarget.style.color = '#f1f5f9';
                }
              }}
              onMouseOut={(e) => {
                const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                e.currentTarget.style.backgroundColor = isActive ? '#1e293b' : 'transparent';
                e.currentTarget.style.color = isActive ? '#f8fafc' : '#94a3b8';
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
     
      </aside>
    </>
  );
};

export default Sidebar;
