import { useQuery } from '@tanstack/react-query';
import { SUPPORTED_COUNTRIES } from './supportedCountries';

// Deteksi negara dari IP (menggunakan API ipapi.co)
export const detectCountryFromIP = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country.toLowerCase();
  } catch (error) {
    console.error('Error detecting country by IP:', error);
    return null;
  }
};

// Sistem deteksi negara hanya dari IP
export const detectCountryWithScoring = async () => {
  try {
    const ipCountry = await detectCountryFromIP();
    // Jika IP detection berhasil dan negara didukung, gunakan itu
    if (ipCountry && SUPPORTED_COUNTRIES[ipCountry]) {
      return ipCountry;
    }
  } catch (error) {
    console.error('IP detection failed:', error);
  }

  // Default ke Indonesia jika deteksi gagal
  return 'id';
};

// Custom hook untuk deteksi negara menggunakan React Query
export const useCountryDetection = () => {
  return useQuery({
    queryKey: ['countryDetection'],
    queryFn: detectCountryWithScoring,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 1,
    onSuccess: (data) => {
      localStorage.setItem('userCountry', data);
    },
    onError: (error) => {
      console.error('Error detecting country:', error);
      localStorage.setItem('userCountry', 'id');
    },
  });
};

// Get country info by code
export const getCountryInfo = (countryCode) => {
  return SUPPORTED_COUNTRIES[countryCode] || SUPPORTED_COUNTRIES.id;
};

// Format nomor WhatsApp dengan format yang sama seperti kode referensi
export const formatWhatsAppNumber = (phoneNumber) => {
  let formattedValue = phoneNumber.replace(/\D/g, '');

  if (formattedValue.startsWith('0')) {
    formattedValue = '62' + formattedValue.substring(1);
  } else if (
    formattedValue.startsWith('1') &&
    !formattedValue.startsWith('60') &&
    !formattedValue.startsWith('62')
  ) {
    formattedValue = '60' + formattedValue;
  } else if (
    formattedValue.startsWith('62') ||
    formattedValue.startsWith('60')
  ) {
    // Biarkan apa adanya jika sudah ada kode negara
  }
  return formattedValue;
};
