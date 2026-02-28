import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => {
    if (window.innerWidth <= 1024) setIsSidebarOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <Header toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <main style={{
          marginLeft: isSidebarOpen && window.innerWidth > 1024 ? '260px' : '0',
          padding: window.innerWidth < 640 ? '15px' : '30px',
          width: isSidebarOpen && window.innerWidth > 1024 ? 'calc(100% - 260px)' : '100%',
          minHeight: 'calc(100vh - 60px)',
          boxSizing: 'border-box',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          maxWidth: '1600px',
          marginRight: 'auto'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
