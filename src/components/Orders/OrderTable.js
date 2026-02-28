import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderRow from './OrderRow';
import { selectAllOrders, deselectAllOnPage } from '../../features/orders/ordersSlice';

const OrderTable = memo(({ orders }) => {
  const dispatch = useDispatch();
  const selectedIds = useSelector((state) => state.orders.selectedIds);
  
  const currentVisibleIds = orders.map(o => o.id);
  const isAllOnPageSelected = currentVisibleIds.length > 0 && 
    currentVisibleIds.every(id => selectedIds.includes(id));

  const handleSelectAllOnPage = useCallback(() => {
    if (isAllOnPageSelected) {
      dispatch(deselectAllOnPage(currentVisibleIds));
    } else {
      dispatch(selectAllOrders(currentVisibleIds));
    }
  }, [dispatch, isAllOnPageSelected, currentVisibleIds]);

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      overflowX: 'auto',
      border: '1px solid #dee2e6'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
        <thead>
          <tr style={{
            backgroundColor: '#f1f3f5',
            borderBottom: '2px solid #dee2e6',
            height: '50px',
            textAlign: 'left',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <th style={{ padding: '0 15px', width: '40px', textAlign: 'center' }}>
              <input 
                type="checkbox" 
                checked={isAllOnPageSelected} 
                onChange={handleSelectAllOnPage} 
              />
            </th>
            <th style={{ padding: '0 15px', width: '120px' }}>Order ID</th>
            <th style={{ padding: '0 15px', width: '200px' }}>Customer</th>
            <th style={{ padding: '0 15px', width: '100px' }}>Amount</th>
            <th style={{ padding: '0 15px', width: '150px' }}>Status</th>
            <th style={{ padding: '0 15px', width: '150px' }}>Created Date</th>
            <th style={{ padding: '0 15px', width: '150px' }}>Last Updated</th>
            <th style={{ padding: '0 15px', width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#666', fontSize: '1.1rem' }}>
                No orders found matching your search or filters.
              </td>
            </tr>
          ) : (
            orders.map(order => (
              <OrderRow 
                key={order.id} 
                order={order} 
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

export default OrderTable;
