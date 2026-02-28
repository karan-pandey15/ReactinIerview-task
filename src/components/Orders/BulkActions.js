import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  bulkUpdateStatus, 
  bulkDeleteOrders, 
  clearSelection,
  selectAllOrdersData
} from '../../features/orders/ordersSlice';
import { exportToJSON, exportToCSV } from '../../utils/exportUtils';
import { useToast } from '../UI/Toast';

const BulkActions = ({ currentVisibleIds = [] }) => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const selectedIds = useSelector((state) => state.orders.selectedIds);
  const entities = useSelector(selectAllOrdersData);

  const currentSelectedCount = selectedIds.length;

  if (currentSelectedCount === 0) return null;

  const handleBulkStatusUpdate = (e) => {
    const status = e.target.value;
    if (!status) return;
    dispatch(bulkUpdateStatus({ ids: selectedIds, status }));
    addToast(`Updated status to ${status} for ${currentSelectedCount} orders`, 'success');
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${currentSelectedCount} orders?`)) {
      dispatch(bulkDeleteOrders(selectedIds));
      addToast(`Deleted ${currentSelectedCount} orders`, 'warning');
    }
  };

  const handleExport = (format) => {
    const dataToExport = selectedIds.map(id => entities[id]).filter(Boolean);
    if (format === 'JSON') {
      exportToJSON(dataToExport);
    } else {
      exportToCSV(dataToExport);
    }
    addToast(`Exported ${currentSelectedCount} orders as ${format}`, 'info');
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px',
      padding: '12px 20px',
      backgroundColor: '#f8fafc',
      borderRadius: '10px',
      marginBottom: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>
        {currentSelectedCount} orders selected
      </span>
      
      <div style={{ height: '24px', width: '1px', backgroundColor: '#cbd5e1' }} />

      <select 
        onChange={handleBulkStatusUpdate} 
        defaultValue=""
        style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 500 }}
      >
        <option value="" disabled>Update Status</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <button 
        onClick={handleBulkDelete}
        style={{
          padding: '8px 14px',
          backgroundColor: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: 600
        }}
      >
        Delete
      </button>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={() => handleExport('JSON')}
          style={{
            padding: '8px 14px',
            backgroundColor: '#0ea5e9',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          JSON
        </button>

        <button 
          onClick={() => handleExport('CSV')}
          style={{
            padding: '8px 14px',
            backgroundColor: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          CSV
        </button>
      </div>

      <button 
        onClick={() => dispatch(clearSelection())}
        style={{
          padding: '8px 14px',
          backgroundColor: '#64748b',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginLeft: 'auto'
        }}
      >
        Deselect All
      </button>
    </div>
  );
};

export default BulkActions;
