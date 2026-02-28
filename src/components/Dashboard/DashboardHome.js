import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectOrdersList } from '../../features/orders/ordersSlice';

const DashboardHome = () => {
  const orders = useSelector(selectOrdersList);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const stats = useMemo(() => {
    const total = orders.length;
    const totalAmount = orders.reduce((acc, o) => acc + o.amount, 0);
    const pendingCount = orders.filter(o => o.status === 'Pending').length;
    const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
    
    return [
      { label: 'Total Orders', value: total.toLocaleString('en-IN'), color: '#0ea5e9' },
      { label: 'Revenue', value: formatCurrency(totalAmount), color: '#10b981' },
      { label: 'Pending', value: pendingCount.toLocaleString('en-IN'), color: '#f59e0b' },
      { label: 'Completed', value: deliveredCount.toLocaleString('en-IN'), color: '#6366f1' },
    ];
  }, [orders]);

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#1e293b' }}>Dashboard Overview</h1>
        <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: '0.95rem' }}>Welcome to your localized Indian order management panel.</p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
            border: '1px solid #f1f5f9',
            borderTop: `4px solid ${stat.color}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'transform 0.2s',
            cursor: 'default'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '10px', color: '#0f172a' }}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
        border: '1px solid #f1f5f9'
      }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', fontWeight: 700, color: '#1e293b' }}>How To manage Order ?</h2>
        <div style={{ color: '#475569', lineHeight: '1.7', fontSize: '1rem' }}>
          <p>
            View, filter, and manage customer orders from the order page select From Sidebar -Manage Orders <strong>{orders.length}</strong> orders with a total 
               </p> 
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DashboardHome;
