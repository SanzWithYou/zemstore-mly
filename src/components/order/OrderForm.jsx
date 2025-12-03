import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Upload,
  FileImage,
  FileText,
  Loader2,
  Gamepad2,
  QrCode,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';

// Import dari countryDetector.js
import {
  useCountryDetection,
  formatWhatsAppNumber,
} from '../utils/countryDetector.js';

// Komponen form order
const OrderForm = ({
  file,
  preview,
  loading,
  paymentMethod,
  selectedBank,
  selectedEwallet,
  selectedQris,
  handleFileChange,
  handleSubmit,
  validationSchema,
}) => {
  // Menggunakan custom hook untuk deteksi negara
  const { data: detectedCountry = 'id' } = useCountryDetection();

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        handleFileChange({ target: { files: acceptedFiles } });
      }
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 2 * 1024 * 1024,
    maxFiles: 1,
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        const rejectedFile = rejectedFiles[0];
        if (rejectedFile.errors[0].code === 'file-too-large') {
          toast.error('Ukuran file terlalu besar. Maksimal 2MB.');
        } else if (rejectedFile.errors[0].code === 'file-invalid-type') {
          toast.error('Tipe file tidak didukung. Hanya PNG, JPG, dan PDF.');
        } else {
          toast.error('Error mengupload file.');
        }
      }
    },
  });

  const getPaymentIcon = () => {
    if (paymentMethod === 'bank') return <Gamepad2 className='h-4 w-4' />;
    if (paymentMethod === 'ewallet') return <FileImage className='h-4 w-4' />;
    if (paymentMethod === 'qris') return <QrCode className='h-4 w-4' />;
    return <Gamepad2 className='h-4 w-4' />;
  };

  const getPaymentText = () => {
    if (paymentMethod === 'bank' && selectedBank)
      return `Bank: ${DOMPurify.sanitize(selectedBank)}`;
    if (paymentMethod === 'ewallet' && selectedEwallet)
      return `E-Wallet: ${DOMPurify.sanitize(selectedEwallet)}`;
    if (paymentMethod === 'qris' && selectedQris)
      return `QRIS: ${DOMPurify.sanitize(selectedQris)}`;
    return 'Pilih metode pembayaran di panel sebelah kiri';
  };

  // Bersihkan input
  const sanitizeInput = (value) => {
    return DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  };

  return (
    <div className='lg:sticky lg:top-6 md:top-8'>
      <Card>
        <CardHeader className='text-center pb-4'>
          <CardTitle className='text-xl md:text-2xl font-bold flex items-center justify-center'>
            <Gamepad2 className='mr-2 h-5 w-5 md:h-6 md:w-6' />
            Form Pemesanan
          </CardTitle>
          <CardDescription className='text-sm'>
            Silakan isi data pemesanan Anda dengan lengkap
          </CardDescription>
        </CardHeader>
        <CardContent className='w-full'>
          <Formik
            initialValues={{
              username: '',
              password: '',
              joki: '',
              contactMethod: 'tiktok', // Default ke TikTok
              tiktokUsername: '',
              whatsappNumber: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // Bersihkan data
              const sanitizedValues = {
                username: sanitizeInput(values.username),
                password: values.password,
                joki: sanitizeInput(values.joki),
                contactMethod: values.contactMethod,
                tiktokUsername:
                  values.contactMethod === 'tiktok'
                    ? sanitizeInput(values.tiktokUsername)
                    : '',
                whatsappNumber:
                  values.contactMethod === 'whatsapp'
                    ? values.whatsappNumber
                    : '',
              };

              handleSubmit(sanitizedValues, { setSubmitting, resetForm });
            }}
          >
            {({ isSubmitting, setFieldValue, values, isValid, dirty }) => (
              <Form className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='username' className='text-sm'>
                    Username Roblox
                  </Label>
                  <Field
                    as={Input}
                    id='username'
                    name='username'
                    placeholder='Masukkan username roblox'
                    className='h-10'
                  />
                  <ErrorMessage
                    name='username'
                    component='div'
                    className='text-xs text-red-500'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='password' className='text-sm'>
                    Password Roblox
                  </Label>
                  <Field
                    as={Input}
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Masukkan password roblox'
                    className='h-10'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-xs text-red-500'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='joki' className='text-sm'>
                    Jenis Joki
                  </Label>
                  <Field
                    as={Input}
                    id='joki'
                    name='joki'
                    placeholder='Contoh: 1x Trial, 100 Mastery, 100 Level, Get Mirror, Dll'
                    className='h-10'
                  />
                  <ErrorMessage
                    name='joki'
                    component='div'
                    className='text-xs text-red-500'
                  />
                </div>

                {/* Radio Group untuk metode kontak */}
                <div className='space-y-2'>
                  <Label className='text-sm'>Metode Kontak</Label>
                  <RadioGroup
                    value={values.contactMethod}
                    onValueChange={(value) => {
                      setFieldValue('contactMethod', value);
                      // Reset field yang tidak dipilih
                      if (value === 'tiktok') {
                        setFieldValue('whatsappNumber', '');
                      } else {
                        setFieldValue('tiktokUsername', '');
                      }
                    }}
                    className='flex space-x-4'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='tiktok' id='tiktok' />
                      <Label htmlFor='tiktok'>TikTok</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='whatsapp' id='whatsapp' />
                      <Label htmlFor='whatsapp'>WhatsApp</Label>
                    </div>
                  </RadioGroup>
                  <ErrorMessage
                    name='contactMethod'
                    component='div'
                    className='text-xs text-red-500'
                  />
                </div>

                {/* Input TikTok (hanya muncul jika TikTok dipilih) */}
                {values.contactMethod === 'tiktok' && (
                  <div className='space-y-2'>
                    <Label htmlFor='tiktokUsername' className='text-sm'>
                      Username TikTok
                    </Label>
                    <Field
                      as={Input}
                      id='tiktokUsername'
                      name='tiktokUsername'
                      placeholder='@username_tiktok'
                      className='h-10'
                    />
                    <ErrorMessage
                      name='tiktokUsername'
                      component='div'
                      className='text-xs text-red-500'
                    />
                  </div>
                )}

                {/* Input WhatsApp (hanya muncul jika WhatsApp dipilih) */}
                {values.contactMethod === 'whatsapp' && (
                  <div className='space-y-2'>
                    <Label htmlFor='whatsappNumber' className='text-sm'>
                      Nomor WhatsApp
                    </Label>
                    <Field
                      as={Input}
                      id='whatsappNumber'
                      name='whatsappNumber'
                      placeholder='Contoh: 08123456789 (ID) atau 123456789 (MY)'
                      className='h-10'
                      onChange={(e) => {
                        const value = e.target.value;
                        // Hanya format jika user mengetik (menambah karakter), bukan menghapus
                        if (value.length > values.whatsappNumber.length) {
                          const formattedValue = formatWhatsAppNumber(value);
                          setFieldValue('whatsappNumber', formattedValue);
                        } else {
                          setFieldValue('whatsappNumber', value);
                        }
                      }}
                    />
                    <ErrorMessage
                      name='whatsappNumber'
                      component='div'
                      className='text-xs text-red-500'
                    />
                    <div className='flex items-start mt-1'>
                      <Info className='h-3 w-3 text-muted-foreground mr-1 mt-0.5 shrink-0' />
                      <p className='text-xs text-muted-foreground'>
                        Format otomatis: Indonesia (0xxx → 62xxx) atau Malaysia
                        (1xxx → 601xxx). Untuk negara lain, masukkan dengan kode
                        negara lengkap.
                      </p>
                    </div>
                  </div>
                )}

                <div className='space-y-2'>
                  <Label className='text-sm'>Metode Pembayaran</Label>
                  <div className='flex items-center space-x-2 p-3 bg-muted rounded-md'>
                    {getPaymentIcon()}
                    <span className='text-xs md:text-sm truncate'>
                      {getPaymentText()}
                    </span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='bukti_transfer' className='text-sm'>
                    Bukti Transfer
                  </Label>
                  <div
                    {...getRootProps()}
                    className={`flex items-center justify-center w-full h-24 md:h-32 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
                      isDragActive
                        ? 'border-primary bg-primary/10'
                        : 'border-muted-foreground/25 bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <input {...getInputProps()} />
                    {preview ? (
                      <div className='flex flex-col items-center justify-center pt-3 pb-4 px-2 w-full'>
                        {file.type.startsWith('image/') ? (
                          <FileImage className='h-8 w-8 md:h-10 md:w-10 text-muted-foreground mb-1 md:mb-2' />
                        ) : (
                          <FileText className='h-8 w-8 md:h-10 md:w-10 text-muted-foreground mb-1 md:mb-2' />
                        )}
                        <p className='text-xs text-muted-foreground truncate max-w-full'>
                          {DOMPurify.sanitize(file.name)}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Klik atau drag untuk mengganti
                        </p>
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center pt-3 pb-4 px-2 w-full'>
                        <Upload className='h-8 w-8 md:h-10 md:w-10 text-muted-foreground mb-1 md:mb-2' />
                        <p className='text-xs md:text-sm text-muted-foreground text-center'>
                          <span className='font-semibold'>
                            Klik untuk upload
                          </span>{' '}
                          atau drag and drop
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          PNG, JPG, PDF (max. 2MB)
                        </p>
                      </div>
                    )}
                  </div>
                  <ErrorMessage
                    name='file'
                    component='div'
                    className='text-xs text-red-500'
                  />
                </div>

                <Button
                  type='submit'
                  disabled={
                    isSubmitting ||
                    loading ||
                    !file ||
                    !isValid ||
                    !dirty ||
                    (paymentMethod === 'bank' && !selectedBank) ||
                    (paymentMethod === 'ewallet' && !selectedEwallet) ||
                    (paymentMethod === 'qris' && !selectedQris)
                  }
                  className='w-full h-10 text-sm'
                >
                  {loading ? (
                    <>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      Memproses...
                    </>
                  ) : (
                    'Kirim Pesanan'
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter className='flex justify-center text-xs text-muted-foreground pt-2'>
          <p>© 2025 Zem Store. All rights reserved.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderForm;
