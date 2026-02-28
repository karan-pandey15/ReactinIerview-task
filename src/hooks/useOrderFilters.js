import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectOrdersList } from '../features/orders/ordersSlice';

export const useOrderFilters = (filters) => {
  const orders = useSelector(selectOrdersList);

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchLower) ||
          order.customerName.toLowerCase().includes(searchLower)
      );
    }

    // Status Filter
    if (filters.status && filters.status !== 'All') {
      result = result.filter((order) => order.status === filters.status);
    }

    // Amount Range
    if (filters.minAmount !== undefined && filters.minAmount !== '') {
      result = result.filter((order) => order.amount >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount !== undefined && filters.maxAmount !== '') {
      result = result.filter((order) => order.amount <= parseFloat(filters.maxAmount));
    }

    // Date Range
    if (filters.startDate) {
      const start = new Date(filters.startDate).getTime();
      result = result.filter((order) => new Date(order.createdAt).getTime() >= start);
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate).getTime();
      result = result.filter((order) => new Date(order.createdAt).getTime() <= end);
    }

    // Sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        let valA = a[filters.sortBy];
        let valB = b[filters.sortBy];

        if (filters.sortBy === 'createdAt' || filters.sortBy === 'lastUpdated') {
          valA = new Date(valA).getTime();
          valB = new Date(valB).getTime();
        }

        if (valA < valB) return filters.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [orders, filters]);

  return filteredOrders;
};
