// Bank payment data
export const bankOptions = [
  // {
  //   id: 'example',
  //   name: 'example',
  //   accountNumber: '1234567890',
  //   accountName: 'example sanz ganteng',
  //   branch: 'example',
  // },
  // {
  //   id: 'mandiri',
  //   name: 'Bank Mandiri',
  //   accountNumber: '0987654321',
  //   accountName: 'PT Joki Service Indonesia',
  //   branch: 'KCP Jakarta Thamrin',
  // },
  // {
  //   id: 'bni',
  //   name: 'Bank Negara Indonesia (BNI)',
  //   accountNumber: '1122334455',
  //   accountName: 'PT Joki Service Indonesia',
  //   branch: 'KCP Jakarta Sudirman',
  // },
  // {
  //   id: 'bri',
  //   name: 'Bank Rakyat Indonesia (BRI)',
  //   accountNumber: '5566778899',
  //   accountName: 'PT Joki Service Indonesia',
  //   branch: 'KCP Jakarta Gatot Subroto',
  // },
  // {
  //   id: 'cimb',
  //   name: 'CIMB Niaga',
  //   accountNumber: '2233445566',
  //   accountName: 'PT Joki Service Indonesia',
  //   branch: 'KCP Jakarta Sudirman',
  // },
  // {
  //   id: 'danamon',
  //   name: 'Bank Danamon',
  //   accountNumber: '6677889900',
  //   accountName: 'PT Joki Service Indonesia',
  //   branch: 'KCP Jakarta Hayam Wuruk',
  // },
];

// E-wallet payment data
export const ewalletOptions = [
  {
    id: 'Touch n Go eWallet',
    name: 'Touch n Go eWallet',
    phoneNumber: '141920206270',
    accountName: 'MUHAMMAD HAZEEM BIN RADZWAN',
  },
  // {
  //   id: 'ovo',
  //   name: 'OVO',
  //   phoneNumber: '0812-3456-7891',
  //   accountName: 'PT Joki Service Indonesia',
  // },
  // {
  //   id: 'dana',
  //   name: 'DANA',
  //   phoneNumber: '0812-3456-7892',
  //   accountName: 'PT Joki Service Indonesia',
  // },
  // {
  //   id: 'shopeepay',
  //   name: 'ShopeePay',
  //   phoneNumber: '0812-3456-7893',
  //   accountName: 'PT Joki Service Indonesia',
  // },
  // {
  //   id: 'linkaja',
  //   name: 'LinkAja',
  //   phoneNumber: '0812-3456-7894',
  //   accountName: 'PT Joki Service Indonesia',
  // },
  // {
  //   id: 'sakuku',
  //   name: 'Sakuku',
  //   phoneNumber: '0812-3456-7895',
  //   accountName: 'PT Joki Service Indonesia',
  // },
];

// QRIS payment data
export const qrisOptions = [
  {
    id: 'qris-static',
    name: 'QRIS Static',
    merchantName: 'MUHAMMAD HAZEEM BIN RADZWAN',
    qrisId: 'ID1234567890',
    qrImage: '/qriss.png', // Path ke gambar QRIS static Anda
  },
];

// Form validation rules
export const validationSchema = {
  username: 'Username wajib diisi',
  password: 'Password wajib diisi',
  joki: 'Jenis joki wajib diisi',
};

// Get bank details
export const getSelectedBankDetails = (selectedBank) => {
  return bankOptions.find((bank) => bank.id === selectedBank);
};

// Get e-wallet details
export const getSelectedEwalletDetails = (selectedEwallet) => {
  return ewalletOptions.find((ewallet) => ewallet.id === selectedEwallet);
};

// Get QRIS details
export const getSelectedQrisDetails = (selectedQris) => {
  return qrisOptions.find((qris) => qris.id === selectedQris);
};
