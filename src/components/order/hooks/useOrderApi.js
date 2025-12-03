import { useState } from 'react';
import api from '@/config/api';
import { toast } from 'sonner';
import { getCountryInfo } from '../../utils/countryDetector';

export const useOrderApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitOrder = async (formData, resetForm, setFile, setPreview) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Ambil data negara dari localStorage
      const userCountry = localStorage.getItem('userCountry') || 'id';
      const countryInfo = getCountryInfo(userCountry);

      const response = await api.post('/api/joki/orders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Country-Code': userCountry,
          'X-Country-Name': countryInfo.name,
          'X-Country-Timezone': countryInfo.timezone,
        },
      });

      if (response.data.success) {
        setSuccess(true);
        resetForm();
        setFile(null);
        setPreview(null);
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
