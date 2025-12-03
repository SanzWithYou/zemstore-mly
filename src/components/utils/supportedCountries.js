// src/components/utils/supportedCountries.js

export const SUPPORTED_COUNTRIES = {
  id: {
    name: 'Indonesia',
    code: 'id',
    phoneCode: '62',
    currency: 'IDR',
    timezone: 'Asia/Jakarta',
    whatsappFormat: 'Contoh: 08123456789',
    flag: '🇮🇩',
    weight: 3, // Bobot untuk Indonesia (target pasar utama)
  },
  my: {
    name: 'Malaysia',
    code: 'my',
    phoneCode: '60',
    currency: 'MYR',
    timezone: 'Asia/Kuala_Lumpur',
    whatsappFormat: 'Contoh: 123456789',
    flag: '🇲🇾',
    weight: 2,
  },
  sg: {
    name: 'Singapore',
    code: 'sg',
    phoneCode: '65',
    currency: 'SGD',
    timezone: 'Asia/Singapore',
    whatsappFormat: 'Contoh: 91234567',
    flag: '🇸🇬',
    weight: 2,
  },
  us: {
    name: 'United States',
    code: 'us',
    phoneCode: '1',
    currency: 'USD',
    timezone: 'America/New_York',
    whatsappFormat: 'Contoh: 1234567890',
    flag: '🇺🇸',
    weight: 1,
  },
  gb: {
    name: 'United Kingdom',
    code: 'gb',
    phoneCode: '44',
    currency: 'GBP',
    timezone: 'Europe/London',
    whatsappFormat: 'Contoh: 7123456789',
    flag: '🇬🇧',
    weight: 1,
  },
  au: {
    name: 'Australia',
    code: 'au',
    phoneCode: '61',
    currency: 'AUD',
    timezone: 'Australia/Sydney',
    whatsappFormat: 'Contoh: 412345678',
    flag: '🇦🇺',
    weight: 1,
  },
  ca: {
    name: 'Canada',
    code: 'ca',
    phoneCode: '1',
    currency: 'CAD',
    timezone: 'America/Toronto',
    whatsappFormat: 'Contoh: 4123456789',
    flag: '🇨🇦',
    weight: 1,
  },
};

// Ekspor ulang fungsi dari countryDetector.js
export {
  detectCountryFromIP,
  detectCountryWithScoring,
  getCountryInfo,
  formatWhatsAppNumber,
} from './countryDetector.js';
