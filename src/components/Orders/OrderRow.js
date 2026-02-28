import React, { memo, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectOrder, updateOrder } from '../../features/orders/ordersSlice';
import { useToast } from '../UI/Toast';

const OrderRow = memo(({ order }) => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const isSelected = useSelector((state) => 
    state.orders.selectedIds.includes(order.id)
  );
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: order.id,
    customerName: order.customerName,
    amount: order.amount,
    status: order.status
  });
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setEditData({
        id: order.id,
        customerName: order.customerName,
        amount: order.amount,
        status: order.status
      });
    }
  }, [isEditing, order]);

  useEffect(() => {
    const lastUpdatedTime = new Date(order.lastUpdated).getTime();
    const now = new Date().getTime();
    if (now - lastUpdatedTime < 2000) {
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [order.lastUpdated]);

  const handleSelect = useCallback(() => {
    dispatch(toggleSelectOrder(order.id));
  }, [dispatch, order.id]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ 
      ...prev, 
      [name]: name === 'amount' ? parseFloat(value) : value 
    }));
  };

  const handleSave = () => {
    dispatch(updateOrder({ id: order.id, data: editData }))
      .unwrap()
      .then(() => {
        addToast(`Order updated successfully!`, 'success');
        setIsEditing(false);
      })
      .catch((err) => addToast(`Failed to update order: ${err.message}`, 'error'));
  };

  const handleCancel = () => {
    setIsEditing(false);
    addToast('Edit cancelled', 'info');
  };

  // Indian currency formatting
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <tr style={{
      borderBottom: '1px solid #f1f5f9',
      backgroundColor: isHighlighted ? '#fef9c3' : (isSelected ? '#f0f9ff' : 'white'),
      transition: 'background-color 0.4s ease',
      height: '70px'
    }}>
      <td style={{ padding: '0 15px', textAlign: 'center' }}>
        <input type="checkbox" checked={isSelected} onChange={handleSelect} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
      </td>
      <td style={{ padding: '0 15px', fontWeight: 600, color: '#1e293b', fontSize: '0.85rem' }}>
        {isEditing ? (
          <input 
            name="id"
            value={editData.id}
            onChange={handleEditChange}
            style={{ width: '100px', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        ) : order.id}
      </td>
      <td style={{ padding: '0 15px', fontSize: '0.9rem', color: '#334155' }}>
        {isEditing ? (
          <input 
            name="customerName"
            value={editData.customerName}
            onChange={handleEditChange}
            style={{ width: '100%', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        ) : order.customerName}
      </td>
      <td style={{ padding: '0 15px', fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
        {isEditing ? (
          <input 
            name="amount"
            type="number"
            value={editData.amount}
            onChange={handleEditChange}
            style={{ width: '100px', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        ) : formatCurrency(order.amount)}
      </td>
      <td style={{ padding: '0 15px' }}>
        {isEditing ? (
          <select 
            name="status"
            value={editData.status} 
            onChange={handleEditChange}
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', width: '110px' }}
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        ) : (
          <span style={{
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            backgroundColor: order.status === 'Delivered' ? '#dcfce7' : 
                             order.status === 'Cancelled' ? '#fee2e2' :
                             order.status === 'Shipped' ? '#e0f2fe' : '#fef9c3',
            color: order.status === 'Delivered' ? '#166534' : 
                   order.status === 'Cancelled' ? '#991b1b' :
                   order.status === 'Shipped' ? '#075985' : '#854d0e',
            display: 'inline-block',
            minWidth: '85px',
            textAlign: 'center'
          }}>{order.status}</span>
        )}
      </td>
      <td style={{ padding: '0 15px', fontSize: '0.8rem', color: '#64748b' }}>
        {new Date(order.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}
      </td>
      <td style={{ padding: '0 15px', fontSize: '0.8rem', color: '#64748b' }}>
        {new Date(order.lastUpdated).toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })}
      </td>
      <td style={{ padding: '0 15px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                style={{ padding: '6px 12px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
              >Save</button>
              <button 
                onClick={handleCancel}
                style={{ padding: '6px 12px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
              >Cancel</button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              style={{ padding: '6px 12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
            >Edit</button>
          )}
        </div>
      </td>
    </tr>
  );
});

export default OrderRow;
