import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import OrderForm from './OrderForm';
import OrderInstructions from './OrderInstructions';
import HeaderInfo from '@/components/ui/header-info';
import { useOrderApi } from './hooks/useOrderApi';
import {
  bankOptions,
  ewalletOptions,
  qrisOptions,
  getSelectedBankDetails,
  getSelectedEwalletDetails,
  getSelectedQrisDetails,
} from './data/paymentOptions';
import { toast } from 'sonner';

const JokiOrderForm = () => {
  // State declarations
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedEwallet, setSelectedEwallet] = useState('');
  const [selectedQris, setSelectedQris] = useState('');
  const [copiedItem, setCopiedItem] = useState('');

  // API hook
  const { loading, error, success, submitOrder, copyToClipboard } =
    useOrderApi();

  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username wajib diisi'),
    password: Yup.string().required('Password wajib diisi'),
    joki: Yup.string().required('Jenis joki wajib diisi'),
  });

  // Success toast
  useEffect(() => {
    if (success) {
      toast.success(
        'Pesanan berhasil dibuat! Kami akan segera memproses pesanan Anda.'
      );
    }
  }, [success]);

  // Error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // File handler
  const handleFileChange = (e) => {
    const files = e.target.files || e.dataTransfer?.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Submit handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', values.username);
    formData.append('password', values.password);
    formData.append('joki', values.joki);
    formData.append('paymentMethod', paymentMethod);

    if (paymentMethod === 'bank') {
      formData.append('paymentDetail', selectedBank);
    } else if (paymentMethod === 'ewallet') {
      formData.append('paymentDetail', selectedEwallet);
    } else if (paymentMethod === 'qris') {
      formData.append('paymentDetail', selectedQris);
    }

    await submitOrder(
      formData,
      resetForm,
      setFile,
      setPreview,
      setPaymentMethod,
      setSelectedBank,
      setSelectedEwallet,
      setSelectedQris
    );

    setSubmitting(false);
  };

  // Copy handler
  const handleCopyToClipboard = (text, type) => {
    copyToClipboard(text, type, setCopiedItem);
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <HeaderInfo
        badgeText='Proses Pemesanan'
        title='Form Pemesanan Joki'
        description='Lengkapi form di bawah ini untuk melakukan pemesanan joki. Pastikan semua data terisi dengan benar dan lampirkan bukti transfer yang valid.'
      />

      {/* Main Content */}
      <div className='container mx-auto px-4 pb-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start'>
          {/* Instructions Column */}
          <OrderInstructions
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            selectedBank={selectedBank}
            setSelectedBank={setSelectedBank}
            selectedEwallet={selectedEwallet}
            setSelectedEwallet={setSelectedEwallet}
            selectedQris={selectedQris}
            setSelectedQris={setSelectedQris}
            copiedItem={copiedItem}
            copyToClipboard={handleCopyToClipboard}
            bankOptions={bankOptions}
            ewalletOptions={ewalletOptions}
            qrisOptions={qrisOptions}
            getSelectedBankDetails={() => getSelectedBankDetails(selectedBank)}
            getSelectedEwalletDetails={() =>
              getSelectedEwalletDetails(selectedEwallet)
            }
            getSelectedQrisDetails={() => getSelectedQrisDetails(selectedQris)}
          />

          {/* Form Column */}
          <OrderForm
            file={file}
            preview={preview}
            loading={loading}
            paymentMethod={paymentMethod}
            selectedBank={selectedBank}
            selectedEwallet={selectedEwallet}
            selectedQris={selectedQris}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            validationSchema={validationSchema}
          />
        </div>
      </div>
    </div>
  );
};

export default JokiOrderForm;
