import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  MessageCircle,
  Circle,
  CircleDot,
  CircleDashed,
  CircleCheck,
  CreditCard,
  Building,
  Smartphone,
  ArrowRight,
  Info,
  Copy,
  Check,
  ShoppingCart,
  Clock,
  Shield,
  QrCode,
  AlertCircle,
  PackageOpen,
  Download,
  Loader2,
} from 'lucide-react';

// Komponen instruksi order
const OrderInstructions = ({
  paymentMethod,
  setPaymentMethod,
  selectedBank,
  setSelectedBank,
  selectedEwallet,
  setSelectedEwallet,
  selectedQris,
  setSelectedQris,
  copiedItem,
  copyToClipboard,
  bankOptions,
  ewalletOptions,
  qrisOptions,
  getSelectedBankDetails,
  getSelectedEwalletDetails,
  getSelectedQrisDetails,
}) => {
  const [qrisImageError, setQrisImageError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Download QRIS
  const handleDownloadQris = async () => {
    const qrDetails = getSelectedQrisDetails();
    // Validasi QRIS
    if (qrDetails && qrDetails.qrImage) {
      setIsDownloading(true);

      try {
        const timestamp = Date.now();
        const fileName = `QRIS-${timestamp}.png`;

        await new Promise((resolve) => setTimeout(resolve, 800));

        const link = document.createElement('a');
        link.href = qrDetails.qrImage;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading QRIS:', error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  React.useEffect(() => {
    setQrisImageError(false);
  }, [selectedQris]);

  // Validasi opsi
  const isBankEmpty = !bankOptions || bankOptions.length === 0;
  const isEwalletEmpty = !ewalletOptions || ewalletOptions.length === 0;
  const isQrisEmpty = !qrisOptions || qrisOptions.length === 0;

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='flex items-center text-lg md:text-xl'>
            <MessageCircle className='mr-2 h-5 w-5' />
            Cara Pemesanan
          </CardTitle>
          <CardDescription className='text-sm'>
            Ikuti langkah-langkah berikut untuk melakukan pemesanan joki
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4 md:space-y-6'>
          <div className='flex gap-3 md:gap-4'>
            <div className='shrink-0'>
              <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                <Circle className='h-5 w-5 text-primary' />
              </div>
            </div>
            <div>
              <h3 className='font-semibold mb-1 text-base md:text-sm'>
                Pilih Layanan
              </h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Pilih layanan joki dari daftar Zem Store. Jika tidak tersedia,
                konfirmasi ke Zem untuk harga joki yang Anda inginkan. Saat ini
                hanya tersedia untuk Blox Fruits.
              </p>
            </div>
          </div>

          <div className='flex gap-3 md:gap-4'>
            <div className='shrink-0'>
              <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                <CircleDot className='h-5 w-5 text-primary' />
              </div>
            </div>
            <div>
              <h3 className='font-semibold mb-1 text-base md:text-sm'>
                Isi Data Pemesanan
              </h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Lengkapi formulir pemesanan dengan informasi yang benar dan
                valid. Pastikan username serta password Roblox Anda diisi dengan
                tepat.
              </p>
            </div>
          </div>

          <div className='flex gap-3 md:gap-4'>
            <div className='shrink-0'>
              <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                <CircleDashed className='h-5 w-5 text-primary' />
              </div>
            </div>
            <div>
              <h3 className='font-semibold mb-1 text-base md:text-sm'>
                Lakukan Pembayaran
              </h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Transfer sesuai total biaya joki yang Anda pilih atau yang telah
                dikonfirmasi oleh Zem. Unggah bukti pembayaran pada formulir
                untuk mempercepat verifikasi.
              </p>
            </div>
          </div>

          <div className='flex gap-3 md:gap-4'>
            <div className='shrink-0'>
              <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                <CircleCheck className='h-5 w-5 text-primary' />
              </div>
            </div>
            <div>
              <h3 className='font-semibold mb-1 text-base md:text-sm'>
                Tunggu Proses
              </h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Jika bukti transfer sesuai dengan layanan pada daftar atau yang
                dikonfirmasi oleh Zem, tim Zem akan memproses pesanan Anda
                secepatnya. Estimasi pengerjaan 1–24 jam, tergantung antrean dan
                tingkat kesulitan.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Selection */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center text-lg md:text-xl'>
            <CreditCard className='mr-2 h-5 w-5' />
            Metode Pembayaran
          </CardTitle>
          <CardDescription className='text-sm'>
            Pilih metode pembayaran yang Anda inginkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Pilih metode pembayaran */}
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className='grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='bank' id='bank' disabled={isBankEmpty} />
              <Label
                htmlFor='bank'
                className={`flex items-center cursor-pointer text-sm ${
                  isBankEmpty ? 'opacity-50' : ''
                }`}
              >
                <Building className='mr-2 h-4 w-4 ' />
                Transfer Bank
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem
                value='ewallet'
                id='ewallet'
                disabled={isEwalletEmpty}
              />
              <Label
                htmlFor='ewallet'
                className={`flex items-center cursor-pointer text-sm ${
                  isEwalletEmpty ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Smartphone className='mr-2 h-4 w-4' />
                E-Wallet
                {isEwalletEmpty && (
                  <Badge variant='secondary' className='ml-2 text-xs'>
                    Coming Soon
                  </Badge>
                )}
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='qris' id='qris' disabled={isQrisEmpty} />
              <Label
                htmlFor='qris'
                className={`flex items-center cursor-pointer text-sm ${
                  isQrisEmpty ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <QrCode className='mr-2 h-4 w-4' />
                QRIS
                {isQrisEmpty && (
                  <Badge variant='secondary' className='ml-2 text-xs'>
                    Coming Soon
                  </Badge>
                )}
              </Label>
            </div>
          </RadioGroup>
          {/* Bank Payment */}
          {paymentMethod === 'bank' && (
            <div className='mt-4'>
              {isBankEmpty ? (
                <div className='p-6 bg-muted/30 rounded-lg border-2 border-dashed text-center'>
                  <PackageOpen className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
                  <h3 className='font-semibold text-base mb-2'>
                    Metode Belum Tersedia
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Transfer Bank sedang dalam pengembangan. Silakan pilih
                    metode pembayaran lain atau hubungi admin untuk informasi
                    lebih lanjut.
                  </p>
                </div>
              ) : (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-between text-sm h-10'
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

                  {/* Bank Details */}
                  {selectedBank && (
                    <div className='mt-4 p-3 md:p-4 bg-muted/50 rounded-lg border'>
                      <div className='flex items-center mb-3'>
                        <Info className='h-4 w-4 text-primary mr-2' />
                        <span className='font-medium text-sm'>
                          Informasi Pembayaran
                        </span>
                      </div>
                      <div className='space-y-2 text-xs md:text-sm'>
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
                            <span className='font-medium font-mono text-xs'>
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
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {/* E-wallet Payment */}
          {paymentMethod === 'ewallet' && (
            <div className='mt-4'>
              {isEwalletEmpty ? (
                <div className='p-6 bg-muted/30 rounded-lg border-2 border-dashed text-center'>
                  <PackageOpen className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
                  <h3 className='font-semibold text-base mb-2'>
                    Metode Belum Tersedia
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    E-Wallet sedang dalam pengembangan. Silakan pilih metode
                    pembayaran lain atau hubungi admin untuk informasi lebih
                    lanjut.
                  </p>
                </div>
              ) : (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-between text-sm h-10'
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
                              <div className='font-medium'>{ewallet.name}</div>
                            </div>
                            {selectedEwallet === ewallet.id && (
                              <CircleCheck className='h-5 w-5 text-primary' />
                            )}
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* E-wallet Details */}
                  {selectedEwallet && (
                    <div className='mt-4 p-3 md:p-4 bg-muted/50 rounded-lg border'>
                      <div className='flex items-center mb-3'>
                        <Info className='h-4 w-4 text-primary mr-2' />
                        <span className='font-medium text-sm'>
                          Informasi Pembayaran
                        </span>
                      </div>
                      <div className='space-y-2 text-xs md:text-sm'>
                        <div className='flex justify-between items-center'>
                          <span className='text-muted-foreground'>
                            E-Wallet:
                          </span>
                          <span className='font-medium'>
                            {getSelectedEwalletDetails()?.name}
                          </span>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span className='text-muted-foreground'>Number:</span>
                          <div className='flex items-center space-x-2'>
                            <span className='font-medium font-mono text-xs'>
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
                </>
              )}
            </div>
          )}
          {/* QRIS Payment */}
          {paymentMethod === 'qris' && (
            <div className='mt-4'>
              {isQrisEmpty ? (
                <div className='p-6 bg-muted/30 rounded-lg border-2 border-dashed text-center'>
                  <PackageOpen className='h-12 w-12 text-muted-foreground mx-auto mb-3' />
                  <h3 className='font-semibold text-base mb-2'>
                    Metode Belum Tersedia
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    QRIS sedang dalam pengembangan. Silakan pilih metode
                    pembayaran lain atau hubungi admin untuk informasi lebih
                    lanjut.
                  </p>
                </div>
              ) : (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-between text-sm h-10'
                      >
                        {selectedQris
                          ? getSelectedQrisDetails()?.name
                          : 'Pilih QRIS'}
                        <ArrowRight className='h-4 w-4' />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[500px]'>
                      <DialogHeader>
                        <DialogTitle>Pilih QRIS</DialogTitle>
                        <DialogDescription>
                          Pilih QRIS untuk pembayaran
                        </DialogDescription>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        {qrisOptions.map((qris) => (
                          <div
                            key={qris.id}
                            className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                              selectedQris === qris.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border'
                            }`}
                            onClick={() => setSelectedQris(qris.id)}
                          >
                            <QrCode className='h-5 w-5 text-muted-foreground' />
                            <div className='flex-1'>
                              <div className='font-medium'>{qris.name}</div>
                            </div>
                            {selectedQris === qris.id && (
                              <CircleCheck className='h-5 w-5 text-primary' />
                            )}
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* QRIS Details */}
                  {selectedQris && (
                    <div className='mt-4 p-3 md:p-4 bg-muted/50 rounded-lg border'>
                      <div className='flex items-center mb-3'>
                        <Info className='h-4 w-4 text-primary mr-2' />
                        <span className='font-medium text-sm'>
                          Informasi Pembayaran
                        </span>
                      </div>
                      <div className='space-y-4 text-xs md:text-sm'>
                        <div className='flex justify-between items-center'>
                          <span className='text-muted-foreground'>Metode:</span>
                          <span className='font-medium'>
                            {getSelectedQrisDetails()?.name}
                          </span>
                        </div>

                        {/* QRIS Image */}
                        <div className='flex flex-col items-center justify-center'>
                          <span className='text-muted-foreground mb-2'>
                            Scan QRIS:
                          </span>
                          <div className='border-2 border-dashed border-border rounded-lg p-2 '>
                            {qrisImageError ? (
                              <div className='flex flex-col items-center justify-center w-48 h-48 text-center'>
                                <AlertCircle className='h-10 w-10 text-red-500 mb-2' />
                                <span className='text-red-500 font-medium'>
                                  QRIS gagal dimuat
                                </span>
                                <span className='text-xs text-muted-foreground mt-1'>
                                  Silakan hubungi admin
                                </span>
                              </div>
                            ) : (
                              <>
                                <img
                                  src={getSelectedQrisDetails()?.qrImage}
                                  alt='QRIS Payment'
                                  className='w-48 h-48 object-cover'
                                  onError={() => setQrisImageError(true)}
                                />
                                <Button // Download button
                                  onClick={handleDownloadQris}
                                  variant='outline'
                                  size='sm'
                                  className='mt-3 w-full'
                                  disabled={isDownloading}
                                >
                                  {isDownloading ? (
                                    <>
                                      <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                                      Memproses...
                                    </>
                                  ) : (
                                    <>
                                      <Download className='h-4 w-4 mr-2' />
                                      Unduh QRIS
                                    </>
                                  )}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        <div className='flex justify-between items-center'>
                          <span className='text-muted-foreground'>
                            Nama Penerima:
                          </span>
                          <span className='font-medium'>
                            {getSelectedQrisDetails()?.merchantName}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4'>
        <div className='flex items-center justify-center p-3 md:p-4 bg-muted/50 rounded-lg'>
          <ShoppingCart className='h-5 w-5 text-primary mr-2' />
          <span className='text-xs md:text-sm'>Pemesanan Mudah</span>
        </div>
        <div className='flex items-center justify-center p-3 md:p-4 bg-muted/50 rounded-lg'>
          <Clock className='h-5 w-5 text-primary mr-2' />
          <span className='text-xs md:text-sm'>Proses 1-24 Jam</span>
        </div>
        <div className='flex items-center justify-center p-3 md:p-4 bg-muted/50 rounded-lg'>
          <Shield className='h-5 w-5 text-primary mr-2' />
          <span className='text-xs md:text-sm'>Keamanan Terjamin</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInstructions;
