import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import HeaderInfo from '@/components/ui/header-info';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceRequestForm from './ServiceRequestForm';
import jokiCategories from './data/jokiCategories'; // Import data

const JokiVariant1 = () => {
  // Format mata uang
  const formatIdr = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format ringgit
  const formatMyr = (price) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Inisialisasi state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paginationState, setPaginationState] = useState({});
  const itemsPerPage = 6;

  // Cek layout
  const shouldUseSplitLayout = (categoryId) => {
    return ['belly-fragment', 'level-mastery', 'sword-gun'].includes(
      categoryId
    );
  };

  // Validasi pagination
  const needsPagination = (data) => {
    return data.length > itemsPerPage;
  };

  // Ambil data kiri
  const getLeftColumnServices = (category) => {
    if (category.id === 'level-mastery') {
      return category.services.filter((service) =>
        service.name.includes('Level')
      );
    } else if (category.id === 'sword-gun') {
      return category.subCategories[0].services;
    } else {
      return category.services.slice(0, 2);
    }
  };

  // Ambil data kanan
  const getRightColumnServices = (category) => {
    if (category.id === 'level-mastery') {
      return category.services.filter((service) =>
        service.name.includes('Mastery')
      );
    } else if (category.id === 'sword-gun') {
      return category.subCategories[1].services;
    } else {
      return category.services.slice(2);
    }
  };

  // Ambil judul kiri
  const getLeftColumnTitle = (category) => {
    if (category.id === 'level-mastery') {
      return 'Level';
    } else if (category.id === 'sword-gun') {
      return category.subCategories[0].name;
    } else {
      return category.name.split('/')[0];
    }
  };

  // Ambil judul kanan
  const getRightColumnTitle = (category) => {
    if (category.id === 'level-mastery') {
      return 'Mastery';
    } else if (category.id === 'sword-gun') {
      return category.subCategories[1].name;
    } else {
      return category.name.split('/')[1];
    }
  };

  // Hitung data halaman
  const getPaginatedData = (data, paginationId) => {
    if (!needsPagination(data)) {
      return data;
    }

    if (!paginationState[paginationId]) {
      setPaginationState((prev) => ({ ...prev, [paginationId]: 1 }));
      return data.slice(0, itemsPerPage);
    }

    const currentPage = paginationState[paginationId] || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Hitung total halaman
  const getTotalPages = (data) => {
    return Math.ceil(data.length / itemsPerPage);
  };

  // Navigasi halaman
  const goToPage = (paginationId, page) => {
    setPaginationState((prev) => ({ ...prev, [paginationId]: page }));
  };

  // Tutup dialog
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // Komponen pagination
  const Pagination = ({ paginationId, totalItemsCount }) => {
    if (totalItemsCount <= itemsPerPage) {
      return null;
    }

    const totalPages = Math.ceil(totalItemsCount / itemsPerPage);
    const currentPageNum = paginationState[paginationId] || 1;

    return (
      <div className='flex items-center justify-between mt-4 p-2 bg-muted/30 rounded-lg'>
        <div className='text-sm text-muted-foreground'>
          {(currentPageNum - 1) * itemsPerPage + 1} -{' '}
          {Math.min(currentPageNum * itemsPerPage, totalItemsCount)} dari{' '}
          {totalItemsCount} item
        </div>
        <div className='flex space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => goToPage(paginationId, currentPageNum - 1)}
            disabled={currentPageNum === 1}
            className='h-8 w-8 p-0'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <div className='flex items-center px-3 text-sm font-medium'>
            {currentPageNum} / {totalPages}
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => goToPage(paginationId, currentPageNum + 1)}
            disabled={currentPageNum === totalPages}
            className='h-8 w-8 p-0'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    );
  };

  // Komponen service item
  const ServiceItem = ({ service }) => {
    return (
      <div className='border border-border rounded-lg p-4'>
        <div className='flex justify-between items-center w-full'>
          <h4 className='font-semibold text-sm md:text-base'>{service.name}</h4>
          <div className='flex items-center gap-2'>
            {service.priceMyr !== undefined && (
              <Badge variant='outline' className='text-xs'>
                {formatMyr(service.priceMyr)}
              </Badge>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='bg-background pb-12'>
      {/* Header informasi */}
      <HeaderInfo
        badgeText='Layanan Joki'
        title='Joki Blox Fruit'
        description='Pilih layanan joki yang Anda butuhkan dari daftar yang tersedia. Kami menyediakan berbagai layanan joki untuk game Blox Fruit Roblox.'
      />

      {/* Konten utama */}
      <div className='container mx-auto px-4'>
        {/* Tab utama */}
        <Tabs defaultValue={jokiCategories[0].id} className='w-full'>
          {/* Menu tab kategori */}
          <TabsList className='grid w-full grid-cols-10 mb-2 px-2'>
            {jokiCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className='flex items-center gap-2'
              >
                <category.icon className='h-4 w-4' />
                <span className='hidden sm:inline text-sm truncate'>
                  {category.name}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Konten tab */}
          {jokiCategories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className='space-y-4'
            >
              <Card className='border-border'>
                {/* Header kategori */}
                <CardHeader>
                  <CardTitle className='flex items-center gap-3 text-lg md:text-xl'>
                    <category.icon className='h-5 w-5 md:h-6 md:w-6 text-primary' />
                    {category.name}
                  </CardTitle>
                  <p className='text-sm md:text-base text-muted-foreground'>
                    {category.description}
                  </p>
                </CardHeader>

                <CardContent>
                  {/* Layout dua kolom */}
                  {shouldUseSplitLayout(category.id) ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      {/* Kolom kiri */}
                      <div>
                        <h3 className='font-semibold mb-3 text-sm md:text-base'>
                          {getLeftColumnTitle(category)}
                        </h3>
                        <div className='space-y-4'>
                          {getPaginatedData(
                            getLeftColumnServices(category),
                            `${category.id}-left`
                          ).map((service) => (
                            <ServiceItem key={service.id} service={service} />
                          ))}
                        </div>
                        {/* Pagination kolom kiri */}
                        <Pagination
                          paginationId={`${category.id}-left`}
                          totalItemsCount={
                            getLeftColumnServices(category).length
                          }
                        />
                      </div>

                      {/* Kolom kanan */}
                      <div>
                        <h3 className='font-semibold mb-3 text-sm md:text-base'>
                          {getRightColumnTitle(category)}
                        </h3>
                        <div className='space-y-4'>
                          {getPaginatedData(
                            getRightColumnServices(category),
                            `${category.id}-right`
                          ).map((service) => (
                            <ServiceItem key={service.id} service={service} />
                          ))}
                        </div>
                        {/* Pagination kolom kanan */}
                        <Pagination
                          paginationId={`${category.id}-right`}
                          totalItemsCount={
                            getRightColumnServices(category).length
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    /* Layout satu kolom */
                    <div className='space-y-4'>
                      {getPaginatedData(category.services, category.id).map(
                        (service) => (
                          <ServiceItem key={service.id} service={service} />
                        )
                      )}
                      {/* Pagination */}
                      <Pagination
                        paginationId={category.id}
                        totalItemsCount={category.services.length}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Dialog request custom */}
        <div className='mt-8 flex justify-center'>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant='outline' className='text-sm'>
                <MessageSquare className='h-4 w-4 mr-2' />
                Tidak menemukan jasa joki yang Anda cari?
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px]'>
              <DialogHeader>
                <DialogTitle>Permintaan Layanan Kustom</DialogTitle>
                <DialogDescription>
                  Jika layanan yang Anda butuhkan tidak tersedia di daftar kami,
                  silakan ajukan permintaan kustom.
                </DialogDescription>
              </DialogHeader>
              <ServiceRequestForm onSuccess={handleDialogClose} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default JokiVariant1;
