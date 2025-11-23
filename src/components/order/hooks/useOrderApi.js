// components/order/hooks/useOrderApi.js
import { useState } from 'react';
import api from '../../../config/api'; // Sesuaikan path
import { toast } from 'sonner';

export const useOrderApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitOrder = async (
    formData,
    resetForm,
    setFile,
    setPreview,
    setPaymentMethod,
    setSelectedBank,
    setSelectedEwallet,
    setSelectedQris
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post('/api/orders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess(true);
        resetForm();
        setFile(null);
        setPreview(null);
        setPaymentMethod('bank');
        setSelectedBank('');
        setSelectedEwallet('');
        setSelectedQris('');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      if (err.response?.status === 429) {
        setError(
          'Terlalu banyak permintaan. Silakan tunggu beberapa saat sebelum mencoba lagi.'
        );
      } else {
        setError(
          err.response?.data?.message || 'Terjadi kesalahan saat mengirim data'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, type, setCopiedItem) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedItem(type);
        toast.success(`${type} berhasil disalin!`);
        setTimeout(() => setCopiedItem(''), 2000);
      })
      .catch(() => {
        toast.error('Gagal menyalin ke clipboard');
      });
  };

  return {
    loading,
    error,
    success,
    submitOrder,
    copyToClipboard,
  };
};
