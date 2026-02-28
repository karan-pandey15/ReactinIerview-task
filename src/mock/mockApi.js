import { generateOrders } from './generateOrders';

const STORAGE_KEY = 'dashboard_orders';

// Initialize orders from localStorage or generate new ones
const getStoredOrders = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // If we find orders with amount > 5000, we clear and regenerate to follow new requirements
      const needsRegeneration = parsed.some(o => o.amount > 5000);
      if (!needsRegeneration) {
        return parsed;
      }
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to parse stored orders', e);
    }
  }
  const initialOrders = generateOrders();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrders));
  return initialOrders;
};

let orders = getStoredOrders();

const saveToStorage = (updatedOrders) => {
  orders = updatedOrders;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const mockApi = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'admin123') {
          resolve({ token: 'mock-token', user: { name: 'Admin User', email } });
        } else {
          reject({ message: 'Invalid credentials' });
        }
      }, 500);
    });
  },

  getOrders: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Always return fresh copy from local storage to ensure consistency
        orders = getStoredOrders();
        resolve([...orders]);
      }, 500);
    });
  },

  updateOrder: async (id, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
          // Check for ID uniqueness if ID is being changed
          if (data.id && data.id !== id) {
            const idExists = orders.some(o => o.id === data.id);
            if (idExists) {
              reject({ message: 'Order ID already exists' });
              return;
            }
          }

          // Simulate failure (reduced to 5% for better UX)
          if (Math.random() < 0.05) {
            reject({ message: 'Server synchronization failed' });
            return;
          }
          const updatedOrder = { 
            ...orders[index], 
            ...data, 
            lastUpdated: new Date().toISOString() 
          };
          const newOrders = [...orders];
          newOrders[index] = updatedOrder;
          saveToStorage(newOrders);
          resolve(updatedOrder);
        } else {
          reject({ message: 'Order not found' });
        }
      }, 300);
    });
  },

  deleteOrder: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
          const newOrders = orders.filter(o => o.id !== id);
          saveToStorage(newOrders);
          resolve({ success: true });
        } else {
          reject({ message: 'Order not found' });
        }
      }, 300);
    });
  },

  bulkUpdateStatus: async (ids, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lastUpdated = new Date().toISOString();
        const newOrders = orders.map(order => {
          if (ids.includes(order.id)) {
            return { ...order, status, lastUpdated };
          }
          return order;
        });
        saveToStorage(newOrders);
        resolve({ success: true, ids, status, lastUpdated });
      }, 600);
    });
  },

  bulkDeleteOrders: async (ids) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrders = orders.filter(order => !ids.includes(order.id));
        saveToStorage(newOrders);
        resolve({ success: true, ids });
      }, 600);
    });
  }
};

// For real-time simulation
export const updateRandomOrder = () => {
  if (orders.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * orders.length);
  const statuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const newAmount = parseFloat((Math.random() * 4500 + 500).toFixed(2)); // Max 5000
  
  const updatedOrder = {
    ...orders[randomIndex],
    status: newStatus,
    amount: newAmount,
    lastUpdated: new Date().toISOString()
  };
  
  const newOrders = [...orders];
  newOrders[randomIndex] = updatedOrder;
  saveToStorage(newOrders);
  
  return updatedOrder;
};
