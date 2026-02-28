import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../features/orders/ordersSlice';
import OrderTable from './OrderTable';
import OrderFilters from './OrderFilters';
import BulkActions from './BulkActions';
import Pagination from '../UI/Pagination';
import { useOrderFilters } from '../../hooks/useOrderFilters';
import { useDebounce } from '../../hooks/useDebounce';
import { useRealTimeUpdates } from '../../hooks/useRealTimeUpdates';

const ITEMS_PER_PAGE = 20;

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.orders);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const debouncedSearch = useDebounce(filters.search, 500);
  
  const activeFilters = useMemo(() => ({
    ...filters,
    search: debouncedSearch
  }), [filters, debouncedSearch]);

  const filteredOrders = useOrderFilters(activeFilters);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  useRealTimeUpdates(status === 'succeeded');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [status, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', flexDirection: window.innerWidth < 640 ? 'column' : 'row', justifyContent: 'space-between', alignItems: window.innerWidth < 640 ? 'flex-start' : 'center', marginBottom: '25px', gap: '10px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#1e293b' }}>Order Management</h1>
          <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: '0.9rem' }}>View, filter, and manage customer orders in real-time.</p>
        </div>
        <div style={{ 
          backgroundColor: '#f1f5f9', 
          padding: '8px 16px', 
          borderRadius: '8px', 
          fontSize: '0.85rem', 
          fontWeight: 600, 
          color: '#475569',
          border: '1px solid #e2e8f0'
        }}>
          Total: {filteredOrders.length} records
        </div>
      </div>

      <OrderFilters filters={filters} setFilters={setFilters} />
      
      <BulkActions currentVisibleIds={paginatedOrders.map(o => o.id)} />

      {status === 'loading' && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <div className="spinner" />
          <span style={{ marginLeft: '15px', color: '#64748b', fontWeight: 600 }}>Fetching data...</span>
        </div>
      )}
      
      {status === 'failed' && (
        <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#fee2e2', borderRadius: '12px', color: '#b91c1c', border: '1px solid #fecaca' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Error loading orders</div>
          <p>{error}</p>
          <button 
            onClick={() => dispatch(fetchOrders())} 
            style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >Retry Now</button>
        </div>
      )}

      {status === 'succeeded' && (
        <>
          <OrderTable orders={paginatedOrders} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid #e2e8f0;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OrdersPage;
