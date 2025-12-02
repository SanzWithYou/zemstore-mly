import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Upload,
  FileImage,
  FileText,
  Loader2,
  ShoppingCart,
  Clock,
  Shield,
  CheckCircle,
  Circle,
  CircleDot,
  CircleDashed,
  CircleCheck,
  CreditCard,
  Gamepad2,
  MessageCircle,
  Building,
  Smartphone,
  ArrowRight,
  Info,
  Copy,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

const FormJoki = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedEwallet, setSelectedEwallet] = useState('');
  const [copiedItem, setCopiedItem] = useState('');

  // Tampilkan toast sukses
  useEffect(() => {
    if (success) {
      toast.success(
        'Pesanan berhasil dibuat! Kami akan segera memproses pesanan Anda.'
      );
    }
  }, [success]);

  // Tampilkan toast error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Validasi form
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username wajib diisi'),
    password: Yup.string().required('Password wajib diisi'),
    joki: Yup.string().required('Jenis joki wajib diisi'),
  });

  // Ubah file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Submit form
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('username', values.username);
      formData.append('password', values.password);
      formData.append('joki', values.joki);
      formData.append('paymentMethod', paymentMethod);
      formData.append(
        'paymentDetail',
        paymentMethod === 'bank' ? selectedBank : selectedEwallet
      );

      const response = await axios.post(
        'http://localhost:3000/api/orders',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        resetForm();
        setFile(null);
        setPreview(null);
        setPaymentMethod('bank');
        setSelectedBank('');
        setSelectedEwallet('');
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
      setSubmitting(false);
    }
  };

  // Salin ke clipboard
  const copyToClipboard = (text, type) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedItem(type);
        toast.success(`${type} berhasil disalin!`);
        setTimeout(() => setCopiedItem(''), 2000);
      })
      .catch((err) => {
        toast.error('Gagal menyalin ke clipboard');
      });
  };

  // Data opsi bank
  const bankOptions = [
    {
      id: 'bca',
      name: 'Bank Central Asia (BCA)',
      accountNumber: '1234567890',
      accountName: 'PT Joki Service Indonesia',
      branch: 'KCP Jakarta Pusat',
    },
    {
      id: 'mandiri',
      name: 'Bank Mandiri',
      accountNumber: '0987654321',
      accountName: 'PT Joki Service Indonesia',
      branch: 'KCP Jakarta Thamrin',
    },
    {
      id: 'bni',
      name: 'Bank Negara Indonesia (BNI)',
      accountNumber: '1122334455',
      accountName: 'PT Joki Service Indonesia',
      branch: 'KCP Jakarta Sudirman',
    },
    {
      id: 'bri',
      name: 'Bank Rakyat Indonesia (BRI)',
      accountNumber: '5566778899',
      accountName: 'PT Joki Service Indonesia',
      branch: 'KCP Jakarta Gatot Subroto',
    },
    {
      id: 'cimb',
      name: 'CIMB Niaga',
      accountNumber: '2233445566',
      accountName: 'PT Joki Service Indonesia',
      branch: 'KCP Jakarta Sudirman',
    },
    {
      id: 'danamon',
      name: 'Bank Danamon',
      accountNumber: '6677889900',
      accountName: 'PT Joki Service Indonesia',
      branch: 'KCP Jakarta Hayam Wuruk',
    },
  ];

  // Data opsi e-wallet
  const ewalletOptions = [
    {
      id: 'gopay',
      name: 'GoPay',
      phoneNumber: '0812-3456-7890',
      accountName: 'PT Joki Service Indonesia',
    },
    {
      id: 'ovo',
      name: 'OVO',
      phoneNumber: '0812-3456-7891',
      accountName: 'PT Joki Service Indonesia',
    },
    {
      id: 'dana',
      name: 'DANA',
      phoneNumber: '0812-3456-7892',
      accountName: 'PT Joki Service Indonesia',
    },
    {
      id: 'shopeepay',
      name: 'ShopeePay',
      phoneNumber: '0812-3456-7893',
      accountName: 'PT Joki Service Indonesia',
    },
    {
      id: 'linkaja',
      name: 'LinkAja',
      phoneNumber: '0812-3456-7894',
      accountName: 'PT Joki Service Indonesia',
    },
    {
      id: 'sakuku',
      name: 'Sakuku',
      phoneNumber: '0812-3456-7895',
      accountName: 'PT Joki Service Indonesia',
    },
  ];

  // Ambil detail bank
  const getSelectedBankDetails = () => {
    return bankOptions.find((bank) => bank.id === selectedBank);
  };

  // Ambil detail e-wallet
  const getSelectedEwalletDetails = () => {
    return ewalletOptions.find((ewallet) => ewallet.id === selectedEwallet);
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Bagian informasi header */}
      <div className='text-center mb-12 pt-16 pb-8'>
        <Badge variant='secondary' className='mb-4'>
          Proses Pemesanan
        </Badge>
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>
          Form Pemesanan Joki
        </h2>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Lengkapi form di bawah ini untuk melakukan pemesanan joki. Pastikan
          semua data terisi dengan benar dan lampirkan bukti transfer yang
          valid.
        </p>
      </div>

      {/* Konten utama */}
      <div className='max-w-6xl mx-auto px-4 pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
          {/* Kolom kiri */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <MessageCircle className='mr-2 h-5 w-5' />
                  Cara Pemesanan
                </CardTitle>
                <CardDescription>
                  Ikuti langkah-langkah berikut untuk melakukan pemesanan joki
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                {/* Langkah pertama */}
                <div className='flex gap-4'>
                  <div className='shrink-0'>
                    <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                      <Circle className='h-5 w-5 text-primary' />
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>Pilih Layanan</h3>
                    <p className='text-sm text-muted-foreground'>
                      Pilih jenis joki yang Anda butuhkan dari daftar layanan
                      kami. Kami menyediakan joki untuk berbagai game populer.
                    </p>
                  </div>
                </div>

                {/* Langkah kedua */}
                <div className='flex gap-4'>
                  <div className='shrink-0'>
                    <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                      <CircleDot className='h-5 w-5 text-primary' />
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>Isi Data Pemesanan</h3>
                    <p className='text-sm text-muted-foreground'>
                      Lengkapi form pemesanan dengan data yang valid. Pastikan
                      username dan password game Anda benar.
                    </p>
                  </div>
                </div>

                {/* Langkah ketiga */}
                <div className='flex gap-4'>
                  <div className='shrink-0'>
                    <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                      <CircleDashed className='h-5 w-5 text-primary' />
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>Lakukan Pembayaran</h3>
                    <p className='text-sm text-muted-foreground'>
                      Transfer pembayaran sesuai dengan harga layanan. Lampirkan
                      bukti transfer pada form pemesanan.
                    </p>
                  </div>
                </div>

                {/* Langkah keempat */}
                <div className='flex gap-4'>
                  <div className='shrink-0'>
                    <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                      <CircleCheck className='h-5 w-5 text-primary' />
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>Tunggu Proses</h3>
                    <p className='text-sm text-muted-foreground'>
                      Tim kami akan segera memproses pesanan Anda. Estimasi
                      waktu proses 1-24 jam tergantung antrian.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <CreditCard className='mr-2 h-5 w-5' />
                  Metode Pembayaran
                </CardTitle>
                <CardDescription>
                  Pilih metode pembayaran yang Anda inginkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className='grid grid-cols-2 gap-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='bank' id='bank' />
                    <Label
                      htmlFor='bank'
                      className='flex items-center cursor-pointer'
                    >
                      <Building className='mr-2 h-4 w-4' />
                      Transfer Bank
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='ewallet' id='ewallet' />
                    <Label
                      htmlFor='ewallet'
                      className='flex items-center cursor-pointer'
                    >
                      <Smartphone className='mr-2 h-4 w-4' />
                      E-Wallet
                    </Label>
                  </div>
                </RadioGroup>

                {/* Pilih bank */}
                {paymentMethod === 'bank' && (
                  <div className='mt-4'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant='outline'
                          className='w-full justify-between'
                        >
                          {selectedBank
                            ? getSelectedBankDetails()?.name
                            : 'Pilih Bank'}
                          <ArrowRight className='h-4 w-4' />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-[500px]'>
                        <DialogHeader>
                          <DialogTitle>Pilih Bank</DialogTitle>
                          <DialogDescription>
                            Pilih bank tujuan transfer pembayaran
                          </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                          {bankOptions.map((bank) => (
                            <div
                              key={bank.id}
                              className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                                selectedBank === bank.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border'
                              }`}
                              onClick={() => setSelectedBank(bank.id)}
                            >
                              <Building className='h-5 w-5 text-muted-foreground' />
                              <div className='flex-1'>
                                <div className='font-medium'>{bank.name}</div>
                              </div>
                              {selectedBank === bank.id && (
                                <CircleCheck className='h-5 w-5 text-primary' />
                              )}
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Detail bank */}
                    {selectedBank && (
                      <div className='mt-4 p-4 bg-muted/50 rounded-lg border'>
                        <div className='flex items-center mb-3'>
                          <Info className='h-4 w-4 text-primary mr-2' />
                          <span className='font-medium'>
                            Informasi Pembayaran
                          </span>
                        </div>
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between items-center'>
                            <span className='text-muted-foreground'>Bank:</span>
                            <span className='font-medium'>
                              {getSelectedBankDetails()?.name}
                            </span>
                          </div>
                          <div className='flex justify-between items-center'>
                            <span className='text-muted-foreground'>
                              No. Rekening:
                            </span>
                            <div className='flex items-center space-x-2'>
                              <span className='font-medium font-mono'>
                                {getSelectedBankDetails()?.accountNumber}
                              </span>
                              <Button
                                variant='ghost'
                                size='sm'
                                onClick={() =>
                                  copyToClipboard(
                                    getSelectedBankDetails()?.accountNumber,
                                    'Nomor rekening'
                                  )
                                }
                                className='h-6 w-6 p-0'
                              >
                                {copiedItem === 'Nomor rekening' ? (
                                  <Check className='h-4 w-4 text-green-600' />
                                ) : (
                                  <Copy className='h-4 w-4' />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Atas Nama:
                            </span>
                            <span className='font-medium'>
                              {getSelectedBankDetails()?.accountName}
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Cabang:
                            </span>
                            <span className='font-medium'>
                              {getSelectedBankDetails()?.branch}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Pilih e-wallet */}
                {paymentMethod === 'ewallet' && (
                  <div className='mt-4'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant='outline'
                          className='w-full justify-between'
                        >
                          {selectedEwallet
                            ? getSelectedEwalletDetails()?.name
                            : 'Pilih E-Wallet'}
                          <ArrowRight className='h-4 w-4' />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-[500px]'>
                        <DialogHeader>
                          <DialogTitle>Pilih E-Wallet</DialogTitle>
                          <DialogDescription>
                            Pilih e-wallet untuk pembayaran
                          </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                          {ewalletOptions.map((ewallet) => (
                            <div
                              key={ewallet.id}
                              className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                                selectedEwallet === ewallet.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border'
                              }`}
                              onClick={() => setSelectedEwallet(ewallet.id)}
                            >
                              <Smartphone className='h-5 w-5 text-muted-foreground' />
                              <div className='flex-1'>
                                <div className='font-medium'>
                                  {ewallet.name}
                                </div>
                              </div>
                              {selectedEwallet === ewallet.id && (
                                <CircleCheck className='h-5 w-5 text-primary' />
                              )}
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Detail e-wallet */}
                    {selectedEwallet && (
                      <div className='mt-4 p-4 bg-muted/50 rounded-lg border'>
                        <div className='flex items-center mb-3'>
                          <Info className='h-4 w-4 text-primary mr-2' />
                          <span className='font-medium'>
                            Informasi Pembayaran
                          </span>
                        </div>
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between items-center'>
                            <span className='text-muted-foreground'>
                              E-Wallet:
                            </span>
                            <span className='font-medium'>
                              {getSelectedEwalletDetails()?.name}
                            </span>
                          </div>
                          <div className='flex justify-between items-center'>
                            <span className='text-muted-foreground'>
                              No. HP:
                            </span>
                            <div className='flex items-center space-x-2'>
                              <span className='font-medium font-mono'>
                                {getSelectedEwalletDetails()?.phoneNumber}
                              </span>
                              <Button
                                variant='ghost'
                                size='sm'
                                onClick={() =>
                                  copyToClipboard(
                                    getSelectedEwalletDetails()?.phoneNumber,
                                    'Nomor HP'
                                  )
                                }
                                className='h-6 w-6 p-0'
                              >
                                {copiedItem === 'Nomor HP' ? (
                                  <Check className='h-4 w-4 text-green-600' />
                                ) : (
                                  <Copy className='h-4 w-4' />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Atas Nama:
                            </span>
                            <span className='font-medium'>
                              {getSelectedEwalletDetails()?.accountName}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info card */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='flex items-center justify-center p-4 bg-muted/50 rounded-lg'>
                <ShoppingCart className='h-5 w-5 text-primary mr-2' />
                <span className='text-sm'>Pemesanan Mudah</span>
              </div>
              <div className='flex items-center justify-center p-4 bg-muted/50 rounded-lg'>
                <Clock className='h-5 w-5 text-primary mr-2' />
                <span className='text-sm'>Proses 1-24 Jam</span>
              </div>
              <div className='flex items-center justify-center p-4 bg-muted/50 rounded-lg'>
                <Shield className='h-5 w-5 text-primary mr-2' />
                <span className='text-sm'>Keamanan Terjamin</span>
              </div>
            </div>
          </div>

          {/* Kolom kanan */}
          <div className='lg:sticky lg:top-8'>
            <Card>
              <CardHeader className='text-center'>
                <CardTitle className='text-2xl font-bold flex items-center justify-center'>
                  <Gamepad2 className='mr-2 h-6 w-6' />
                  Form Pemesanan
                </CardTitle>
                <CardDescription>
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
                        <Label htmlFor='username'>Username Game</Label>
                        <Field
                          as={Input}
                          id='username'
                          name='username'
                          placeholder='Masukkan username game'
                        />
                        <ErrorMessage
                          name='username'
                          component='div'
                          className='text-sm text-red-500'
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='password'>Password Game</Label>
                        <Field
                          as={Input}
                          id='password'
                          name='password'
                          type='password'
                          placeholder='Masukkan password game'
                        />
                        <ErrorMessage
                          name='password'
                          component='div'
                          className='text-sm text-red-500'
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='joki'>Jenis Joki</Label>
                        <Field
                          as={Input}
                          id='joki'
                          name='joki'
                          placeholder='Contoh: Mobile Legends, PUBG, Free Fire'
                        />
                        <ErrorMessage
                          name='joki'
                          component='div'
                          className='text-sm text-red-500'
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='bukti_transfer'>Bukti Transfer</Label>
                        <div className='flex items-center justify-center w-full'>
                          <label
                            htmlFor='bukti_transfer'
                            className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-md cursor-pointer bg-muted/50 hover:bg-muted transition-colors'
                          >
                            {preview ? (
                              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                {file.type.startsWith('image/') ? (
                                  <FileImage className='h-10 w-10 text-muted-foreground mb-2' />
                                ) : (
                                  <FileText className='h-10 w-10 text-muted-foreground mb-2' />
                                )}
                                <p className='text-xs text-muted-foreground'>
                                  {file.name}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                  Klik untuk mengganti
                                </p>
                              </div>
                            ) : (
                              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                <Upload className='h-10 w-10 text-muted-foreground mb-2' />
                                <p className='text-sm text-muted-foreground'>
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
                            <input
                              id='bukti_transfer'
                              name='file'
                              type='file'
                              className='hidden'
                              onChange={handleFileChange}
                              accept='image/*,.pdf'
                            />
                          </label>
                        </div>
                        <ErrorMessage
                          name='file'
                          component='div'
                          className='text-sm text-red-500'
                        />
                      </div>

                      <Button
                        type='submit'
                        disabled={
                          isSubmitting ||
                          loading ||
                          !file ||
                          (paymentMethod === 'bank' && !selectedBank) ||
                          (paymentMethod === 'ewallet' && !selectedEwallet)
                        }
                        className='w-full'
                      >
                        {loading ? (
                          <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
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
              <CardFooter className='flex justify-center text-sm text-muted-foreground'>
                <p>© 2023 Joki Service. All rights reserved.</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormJoki;
