import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api';
import { toast } from 'sonner';

// Ambil data order
const fetchOrderById = async (orderId) => {
  if (!orderId) return null;

  const response = await api.get(`/api/joki/orders/${orderId}`);

  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.message || 'Gagal mengambil data order');
  }
};

export const useGetOrderById = (id) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
    onError: (error) => {
      toast.error(error.message || 'Gagal mengambil data order');
    },
  });
};
