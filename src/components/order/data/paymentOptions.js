export const bankOptions = [];

export const ewalletOptions = [
  {
    id: 'Touch n Go eWallet',
    name: 'Touch n Go eWallet',
    phoneNumber: '141920206270',
    accountName: 'MUHAMMAD HAZEEM BIN RADZWAN',
  },
];

export const qrisOptions = [
  {
    id: 'qris-static',
    name: 'QRIS Static',
    merchantName: 'MUHAMMAD HAZEEM BIN RADZWAN',
    qrisId: 'ID1234567890',
    qrImage: '/qriss.png',
  },
];

export const validationSchema = {
  username: 'Username wajib diisi',
  password: 'Password wajib diisi',
  joki: 'Jenis joki wajib diisi',
};

export const getSelectedBankDetails = (selectedBank) => {
  return bankOptions.find((bank) => bank.id === selectedBank);
};

export const getSelectedEwalletDetails = (selectedEwallet) => {
  return ewalletOptions.find((ewallet) => ewallet.id === selectedEwallet);
};

export const getSelectedQrisDetails = (selectedQris) => {
  return qrisOptions.find((qris) => qris.id === selectedQris);
};
