import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api';

// Ambil data orders
const fetchOrders = async ({ page = 1, limit = 10 }) => {
  const response = await api.get('/api/joki/orders', {
    params: {
      page,
      limit,
    },
  });

  if (response.data.success) {
    return {
      orders: response.data.data.orders,
      pagination: response.data.data.pagination,
    };
  } else {
    throw new Error(response.data.message || 'Gagal mengambil data orders');
  }
};

export const useGetOrders = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['orders', { page, limit }],
    queryFn: () => fetchOrders({ page, limit }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
  });
};
