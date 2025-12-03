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

// Komponen form order
const JokiOrderForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedEwallet, setSelectedEwallet] = useState('');
  const [selectedQris, setSelectedQris] = useState('');
  const [copiedItem, setCopiedItem] = useState('');

  const { loading, error, success, submitOrder, copyToClipboard } =
    useOrderApi();

  // Validasi form dengan pendekatan custom validation
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username wajib diisi'),
    password: Yup.string().required('Password wajib diisi'),
    joki: Yup.string().required('Jenis joki wajib diisi'),
    contactMethod: Yup.string()
      .oneOf(['tiktok', 'whatsapp'], 'Pilih metode kontak')
      .required('Pilih metode kontak'),
    tiktokUsername: Yup.string().test(
      'tiktok-required',
      'Username TikTok diperlukan',
      function (value) {
        const { contactMethod } = this.parent;
        if (contactMethod === 'tiktok') {
          return value && value.trim() !== '';
        }
        return true;
      }
    ),
    whatsappNumber: Yup.string().test(
      'whatsapp-required',
      'Nomor WhatsApp diperlukan',
      function (value) {
        const { contactMethod } = this.parent;
        if (contactMethod === 'whatsapp') {
          return value && value.trim() !== '';
        }
        return true;
      }
    ),
  });

  useEffect(() => {
    if (success) {
      toast.success(
        'Pesanan berhasil dibuat! Kami akan segera memproses pesanan Anda.'
      );
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleFileChange = (e) => {
    const files = e.target.files || e.dataTransfer?.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Submit order
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);
    formData.append('jenis_joki', values.joki);
    formData.append('tiktok_username', values.tiktokUsername);
    formData.append('whatsapp_number', values.whatsappNumber);
    formData.append('bukti_transfer', file);

    try {
      await submitOrder(formData, resetForm, setFile, setPreview);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyToClipboard = (text, type) => {
    copyToClipboard(text, type, setCopiedItem);
  };

  return (
    <div className='min-h-screen bg-background'>
      <HeaderInfo
        badgeText='Proses Pemesanan'
        title='Form Pemesanan Joki'
        description='Lengkapi form di bawah ini untuk melakukan pemesanan joki. Pastikan semua data terisi dengan benar dan lampirkan bukti transfer yang valid.'
      />

      <div className='container mx-auto px-4 pb-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start'>
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
