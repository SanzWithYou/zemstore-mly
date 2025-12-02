import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User,
  Key,
  Gamepad2,
  ExternalLink,
  AlertCircle,
  Download,
  MoreVertical,
  Loader2,
} from 'lucide-react';
import { useGetOrderById } from './hooks/useGetOrderById';
import { SiTiktok, SiWhatsapp } from 'react-icons/si';

// Komponen detail order
const OrderDetail = ({ orderId, open, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const {
    data: selectedOrder,
    isLoading: orderLoading,
    error,
    isSuccess,
  } = useGetOrderById(orderId);

  // Error gambar
  const handleImageError = () => {
    setImageError(true);
  };

  // Ambil url gambar
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return url;
  };

  // Download file
  const handleDownloadImage = async () => {
    if (!selectedOrder?.bukti_transfer) return;

    setIsDownloading(true);

    try {
      const imageUrl = getImageUrl(selectedOrder.bukti_transfer);

      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;

      const fileName = `bukti-transfer-${orderId}${getFileExtension(
        blob.type
      )}`;
      a.download = fileName;

      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.error('Download failed:', error);

      window.open(getImageUrl(selectedOrder.bukti_transfer), '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  // Cek ekstensi file
  const getFileExtension = (mimeType) => {
    switch (mimeType) {
      case 'image/jpeg':
        return '.jpg';
      case 'image/png':
        return '.png';
      case 'image/gif':
        return '.gif';
      case 'application/pdf':
        return '.pdf';
      default:
        return '.jpg';
    }
  };

  const handleOpenInNewTab = () => {
    // Buka tab baru
    if (selectedOrder?.bukti_transfer) {
      window.open(getImageUrl(selectedOrder.bukti_transfer), '_blank');
    }
  };

  const handleOpenTikTok = () => {
    if (selectedOrder?.tiktok_username) {
      // Format username tiktok
      const tiktokUsername = selectedOrder.tiktok_username.startsWith('@')
        ? selectedOrder.tiktok_username.substring(1)
        : selectedOrder.tiktok_username;

      window.open(`https://www.tiktok.com/@${tiktokUsername}`, '_blank');
    }
  };

  const handleOpenWhatsApp = () => {
    if (selectedOrder?.whatsapp_number) {
      // Hapus karakter nondigit
      let cleanNumber = selectedOrder.whatsapp_number.replace(/[^\d+]/g, '');

      // Pastikan awalan '+'
      if (!cleanNumber.startsWith('+')) {
        cleanNumber = `+${cleanNumber}`;
      }

      window.open(`https://wa.me/${cleanNumber}`, '_blank');
    }
  };

  // Format nomor whatsapp
  const formatWhatsAppNumber = (number) => {
    if (!number) return '';

    let cleanNumber = number.replace(/\D/g, '');

    if (cleanNumber.startsWith('62')) {
      return `62 ${cleanNumber.substring(2, 4)}-${cleanNumber.substring(
        4,
        8
      )}-${cleanNumber.substring(8)}`;
    } else if (cleanNumber.startsWith('60')) {
      return `60 ${cleanNumber.substring(2, 4)}-${cleanNumber.substring(
        4,
        7
      )} ${cleanNumber.substring(7)}`;
    } else if (cleanNumber.startsWith('1')) {
      return `1 (${cleanNumber.substring(1, 4)}) ${cleanNumber.substring(
        4,
        7
      )}-${cleanNumber.substring(7)}`;
    }

    return cleanNumber;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-h-[99vh] p-0'>
        <DialogHeader className='p-6 pb-0'>
          <DialogTitle className='flex items-center'>
            Detail Order {orderId}
          </DialogTitle>
          <DialogDescription className='text-start'>
            Informasi lebih detialed
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='max-h-[70vh] px-6 pt-0'>
          {orderLoading ? (
            <div className='flex items-center justify-center h-48'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            </div>
          ) : isSuccess && selectedOrder ? (
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground mb-1'>
                    Username
                  </h4>
                  <div className='flex items-center'>
                    <User className='h-4 w-4 mr-2 text-muted-foreground' />
                    <span>{selectedOrder.username}</span>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground mb-1'>
                    Password
                  </h4>
                  <div className='flex items-center'>
                    <Key className='h-4 w-4 mr-2 text-muted-foreground' />
                    <span className='font-mono text-sm'>
                      {selectedOrder.password}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground mb-1'>
                    TikTok
                  </h4>
                  {selectedOrder.tiktok_username ? (
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <SiTiktok className='h-4 w-4 mr-2 text-muted-foreground' />
                        <span>{selectedOrder.tiktok_username}</span>
                      </div>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={handleOpenTikTok}
                      >
                        <ExternalLink className='h-3 w-3' />
                      </Button>
                    </div>
                  ) : (
                    <span className='text-muted-foreground'>Tidak ada</span>
                  )}
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground mb-1'>
                    WhatsApp
                  </h4>
                  {selectedOrder.whatsapp_number ? (
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <SiWhatsapp className='h-4 w-4 mr-2 text-muted-foreground' />
                        <span>
                          {formatWhatsAppNumber(selectedOrder.whatsapp_number)}
                        </span>
                      </div>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={handleOpenWhatsApp}
                      >
                        <ExternalLink className='h-3 w-3' />
                      </Button>
                    </div>
                  ) : (
                    <span className='text-muted-foreground'>Tidak ada</span>
                  )}
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground mb-1'>
                    Jenis Joki
                  </h4>
                  <div className='flex items-center'>
                    <Gamepad2 className='h-4 w-4 mr-2 text-muted-foreground' />
                    <span>{selectedOrder.jenis_joki}</span>
                  </div>
                </div>
              </div>
              <div className='space-y-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground mb-1'>
                    Bukti Transfer
                  </h4>
                  {selectedOrder.bukti_transfer ? (
                    <div className='border rounded-md overflow-hidden'>
                      {imageError ? (
                        <div className='flex flex-col items-center justify-center h-48 p-4 bg-muted'>
                          <AlertCircle className='h-12 w-12 text-amber-500 mb-2' />
                          <p className='text-center text-muted-foreground mb-2'>
                            Gambar tidak dapat dimuat
                          </p>
                          <p className='text-xs text-center text-muted-foreground'>
                            Silakan buka di tab baru untuk melihat gambar.
                          </p>
                        </div>
                      ) : (
                        <div className='p-2 bg-card'>
                          <AspectRatio ratio={9 / 16} className='bg-muted/20'>
                            <img
                              src={getImageUrl(selectedOrder.bukti_transfer)}
                              alt='Bukti Transfer'
                              className='rounded-md object-contain w-full h-full'
                              onError={handleImageError}
                              crossOrigin='anonymous'
                            />
                          </AspectRatio>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='flex items-center justify-center h-32 border rounded-md border-dashed'>
                      <p className='text-muted-foreground'>
                        Tidak ada bukti transfer
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : error && open ? (
            <div className='flex flex-col items-center justify-center h-48'>
              <AlertCircle className='h-12 w-12 text-amber-500 mb-2' />
              <p className='text-center text-muted-foreground'>
                {error?.message || 'Gagal memuat data order'}
              </p>
            </div>
          ) : null}
        </ScrollArea>
        <div className='flex justify-end p-6 pt-0 space-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                <MoreVertical className='h-4 w-4 mr-1' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-52'>
              {selectedOrder?.bukti_transfer && (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={handleDownloadImage}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                          Mendownload...
                        </>
                      ) : (
                        <>
                          <Download className='h-4 w-4 mr-2' />
                          Download Bukti Transfer
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleOpenInNewTab}>
                      <ExternalLink className='h-4 w-4 mr-2' />
                      Buka di Tab Baru
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuGroup>
                <DropdownMenuItem variant='destructive' onClick={onClose}>
                  Tutup
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetail;
