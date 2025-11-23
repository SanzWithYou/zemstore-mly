import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
} from 'lucide-react';
import { toast } from 'sonner';

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
  // Handle file drop
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
    maxSize: 2 * 1024 * 1024, // 2MB
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

  // Get payment icon
  const getPaymentIcon = () => {
    if (paymentMethod === 'bank') return <Gamepad2 className='h-4 w-4' />;
    if (paymentMethod === 'ewallet') return <FileImage className='h-4 w-4' />;
    if (paymentMethod === 'qris') return <QrCode className='h-4 w-4' />;
    return <Gamepad2 className='h-4 w-4' />;
  };

  // Get payment text
  const getPaymentText = () => {
    if (paymentMethod === 'bank' && selectedBank)
      return `Bank: ${selectedBank}`;
    if (paymentMethod === 'ewallet' && selectedEwallet)
      return `E-Wallet: ${selectedEwallet}`;
    if (paymentMethod === 'qris' && selectedQris)
      return `QRIS: ${selectedQris}`;
    return 'Pilih metode pembayaran di panel sebelah kiri';
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
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
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
                          {file.name}
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
