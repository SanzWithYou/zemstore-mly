import { useState } from 'react';
import api from '../../../config/api';
import { toast } from 'sonner';

// Kelola permintaan custom
export const useCustomServiceRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRequest = async (formData, onSuccess) => {
    setIsSubmitting(true);

    try {
      const response = await api.post('/api/custom-service-requests', formData);

      if (response.data.success) {
        toast.success(
          'Permintaan layanan Anda telah terkirim! Kami akan menghubungi Anda segera.'
        );
        onSuccess?.();
      } else {
        toast.error(response.data.message || 'Gagal mengirim permintaan');
      }
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error(
          'Terlalu banyak permintaan. Silakan tunggu beberapa saat sebelum mencoba lagi.'
        );
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Gagal mengirim permintaan. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitRequest,
  };
};
