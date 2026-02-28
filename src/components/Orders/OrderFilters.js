import React from 'react';

const OrderFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '12px',
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      border: '1px solid #eee'
    }}>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600 }}>Search</label>
        <input
          name="search"
          type="text"
          value={filters.search}
          onChange={handleChange}
          placeholder="ID or Name..."
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600 }}>Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600 }}>Min ₹</label>
        <input
          name="minAmount"
          type="number"
          value={filters.minAmount}
          onChange={handleChange}
          placeholder="0.00"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600 }}>Max ₹</label>
        <input
          name="maxAmount"
          type="number"
          value={filters.maxAmount}
          onChange={handleChange}
          placeholder="0.00"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600 }}>Start</label>
        <input
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600 }}>End</label>
        <input
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600 }}>Sort By</label>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="createdAt">Created Date</option>
          <option value="amount">Amount</option>
          <option value="lastUpdated">Last Updated</option>
        </select>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600 }}>Order</label>
        <select
          name="sortOrder"
          value={filters.sortOrder}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFilters;
