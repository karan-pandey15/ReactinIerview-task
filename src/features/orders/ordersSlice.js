import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { mockApi } from '../../mock/mockApi';

const initialState = {
  entities: {},
  ids: [],
  status: 'idle', 
  error: null,
  selectedIds: [],
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await mockApi.getOrders();
  return response;
});

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await mockApi.updateOrder(id, data);
      return response;
    } catch (error) {
      return rejectWithValue({ id, message: error.message });
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await mockApi.updateOrder(id, { status });
      return response;
    } catch (error) {
      return rejectWithValue({ id, message: error.message });
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      await mockApi.deleteOrder(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const bulkUpdateStatus = createAsyncThunk(
  'orders/bulkUpdateStatus',
  async ({ ids, status }) => {
    const response = await mockApi.bulkUpdateStatus(ids, status);
    return response;
  }
);

export const bulkDeleteOrders = createAsyncThunk(
  'orders/bulkDeleteOrders',
  async (ids) => {
    const response = await mockApi.bulkDeleteOrders(ids);
    return response.ids;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    toggleSelectOrder: (state, action) => {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);
      if (index === -1) {
        state.selectedIds.push(id);
      } else {
        state.selectedIds.splice(index, 1);
      }
    },
    selectAllOrders: (state, action) => {
      const currentVisibleIds = action.payload;
      const newSelection = [...new Set([...state.selectedIds, ...currentVisibleIds])];
      state.selectedIds = newSelection;
    },
    deselectAllOnPage: (state, action) => {
      const currentVisibleIds = action.payload;
      state.selectedIds = state.selectedIds.filter(id => !currentVisibleIds.includes(id));
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
    realTimeUpdate: (state, action) => {
      const order = action.payload;
      if (state.entities[order.id]) {
        state.entities[order.id] = {
          ...state.entities[order.id],
          ...order
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const entities = {};
        const ids = [];
        action.payload.forEach((order) => {
          entities[order.id] = order;
          ids.push(order.id);
        });
        state.entities = entities;
        state.ids = ids;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateOrder.pending, (state, action) => {
        const { id, data } = action.meta.arg;
        if (state.entities[id]) {
          // Store previous data for rollback
          state.entities[id]._prevData = { ...state.entities[id] };
          
          // Optimistic update
          // If ID changes, we need to handle mapping carefully
          if (data.id && data.id !== id) {
             const oldOrder = state.entities[id];
             state.entities[data.id] = { ...oldOrder, ...data, lastUpdated: new Date().toISOString() };
             state.ids = state.ids.map(oid => oid === id ? data.id : oid);
             state.selectedIds = state.selectedIds.map(oid => oid === id ? data.id : oid);
             // We don't delete state.entities[id] yet so we can rollback if needed
          } else {
             state.entities[id] = { ...state.entities[id], ...data, lastUpdated: new Date().toISOString() };
          }
        }
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const order = action.payload;
        const originalId = action.meta.arg.id;
        
        if (order.id !== originalId) {
          delete state.entities[originalId];
          // We already updated ids and selectedIds in pending, but let's be sure
          if (!state.ids.includes(order.id)) {
            state.ids = state.ids.map(oid => oid === originalId ? order.id : oid);
          }
          if (state.selectedIds.includes(originalId)) {
            state.selectedIds = state.selectedIds.map(oid => oid === originalId ? order.id : oid);
          }
        }
        
        state.entities[order.id] = { ...state.entities[order.id], ...order };
        delete state.entities[order.id]._prevData;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        const { id, data } = action.meta.arg;
        if (data.id && data.id !== id) {
           // Rollback ID change
           if (state.entities[id] && state.entities[id]._prevData) {
              state.entities[id] = state.entities[id]._prevData;
              delete state.entities[id]._prevData;
           }
           delete state.entities[data.id];
           state.ids = state.ids.map(oid => oid === data.id ? id : oid);
           state.selectedIds = state.selectedIds.map(oid => oid === data.id ? id : oid);
        } else if (state.entities[id] && state.entities[id]._prevData) {
          state.entities[id] = state.entities[id]._prevData;
          delete state.entities[id]._prevData;
        }
      })
      .addCase(updateOrderStatus.pending, (state, action) => {
        const { id, status } = action.meta.arg;
        if (state.entities[id]) {
          state.entities[id]._prevStatus = state.entities[id].status;
          state.entities[id].status = status;
          state.entities[id].lastUpdated = new Date().toISOString();
        }
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const order = action.payload;
        state.entities[order.id] = { ...state.entities[order.id], ...order };
        delete state.entities[order.id]._prevStatus;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        const { id } = action.payload;
        if (state.entities[id] && state.entities[id]._prevStatus) {
          state.entities[id].status = state.entities[id]._prevStatus;
          delete state.entities[id]._prevStatus;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const id = action.payload;
        delete state.entities[id];
        state.ids = state.ids.filter(orderId => orderId !== id);
        state.selectedIds = state.selectedIds.filter(orderId => orderId !== id);
      })
      .addCase(bulkUpdateStatus.fulfilled, (state, action) => {
        const { ids, status, lastUpdated } = action.payload;
        ids.forEach(id => {
          if (state.entities[id]) {
            state.entities[id].status = status;
            state.entities[id].lastUpdated = lastUpdated;
          }
        });
        state.selectedIds = [];
      })
      .addCase(bulkDeleteOrders.fulfilled, (state, action) => {
        const ids = action.payload;
        ids.forEach(id => {
          delete state.entities[id];
        });
        state.ids = state.ids.filter(id => !ids.includes(id));
        state.selectedIds = [];
      });
  },
});

export const { 
  toggleSelectOrder, 
  selectAllOrders, 
  deselectAllOnPage,
  clearSelection, 
  realTimeUpdate
} = ordersSlice.actions;

export const selectAllOrdersData = (state) => state.orders.entities;
export const selectOrderIds = (state) => state.orders.ids;
export const selectSelectedOrderIds = (state) => state.orders.selectedIds;

export const selectOrdersList = createSelector(
  [selectAllOrdersData, selectOrderIds],
  (entities, ids) => ids.map(id => entities[id])
);

export default ordersSlice.reducer;
