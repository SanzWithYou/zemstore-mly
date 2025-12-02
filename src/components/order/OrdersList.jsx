import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Key, Gamepad2, RefreshCw, Loader2, Eye } from 'lucide-react';
import OrderDetail from './OrderDetail';
import { SiTiktok, SiWhatsapp } from 'react-icons/si';
import { useGetOrders } from './hooks/useGetOrders';

const TableSkeleton = () => (
  <div className='rounded-md border'>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>
            <Skeleton className='h-4 w-8' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-4 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-4 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-4 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-4 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-4 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-4 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-4 w-32' />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className='h-6 w-16' />
            </TableCell>
            <TableCell>
              <div className='flex items-center'>
                <Skeleton className='h-4 w-4 mr-2' />
                <Skeleton className='h-4 w-24' />
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center'>
                <Skeleton className='h-4 w-4 mr-2' />
                <Skeleton className='h-4 w-20' />
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center'>
                <Skeleton className='h-4 w-4 mr-2' />
                <Skeleton className='h-4 w-16' />
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center'>
                <Skeleton className='h-4 w-4 mr-2' />
                <Skeleton className='h-4 w-16' />
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center'>
                <Skeleton className='h-4 w-4 mr-2' />
                <Skeleton className='h-4 w-16' />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-20' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

// Komponen utama daftar order
const OrdersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetOrders(currentPage, currentLimit);

  const orders = ordersData?.orders || [];
  const pagination = ordersData?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  // Navigasi halaman
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Ubah batas item
  const handleLimitChange = (value) => {
    const newLimit = Number(value);
    setCurrentLimit(newLimit);
    setCurrentPage(1);
  };

  // Refresh data
  const handleRefresh = () => {
    refetch();
  };

  // Lihat detail order
  const handleViewDetails = (order) => {
    setSelectedOrderId(order.id);
    setIsDetailOpen(true);
  };

  // Tutup detail
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedOrderId(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Gamepad2 className='h-5 w-5 mr-2' />
            Daftar Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center h-64 space-y-4'>
          <div className='text-center'>
            <p className='text-red-500 font-medium'>
              {error?.message || 'Terjadi kesalahan'}
            </p>
          </div>
          <Button onClick={handleRefresh} variant='outline'>
            <RefreshCw className='h-4 w-4 mr-2' />
            Coba Lagi
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center h-64 space-y-4'>
          <Gamepad2 className='h-12 w-12 text-muted-foreground' />
          <p className='text-muted-foreground text-lg'>Belum ada data orders</p>
        </CardContent>
      </Card>
    );
  }

  const startItem = (pagination.page - 1) * pagination.limit + 1;
  const endItem = Math.min(
    pagination.page * pagination.limit,
    pagination.total
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <CardTitle className='flex items-center'>
                <Gamepad2 className='h-5 w-5 mr-2' />
                Daftar Orders
              </CardTitle>
              <CardDescription>
                Menampilkan {pagination.total} order
              </CardDescription>
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                onClick={handleRefresh}
                variant='outline'
                size='sm'
                disabled={isFetching}
              >
                {isFetching ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <RefreshCw className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>TikTok</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Jenis Joki</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Badge
                          variant='secondary'
                          className='flex items-center'
                        >
                          {order.id}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <User className='h-4 w-4 mr-2 text-muted-foreground' />
                          {order.username}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <Key className='h-4 w-4 mr-2 text-muted-foreground' />
                          <span className='font-mono text-sm'>
                            {order.password}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {order.tiktok_username ? (
                          <div className='flex items-center'>
                            <SiTiktok className='h-4 w-4 mr-2 text-muted-foreground' />
                            <span className='truncate max-w-[100px] sm:max-w-[150px]'>
                              {order.tiktok_username}
                            </span>
                          </div>
                        ) : (
                          <span className='text-muted-foreground text-sm'>
                            -
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {order.whatsapp_number ? (
                          <div className='flex items-center'>
                            <SiWhatsapp className='h-4 w-4 mr-2 text-muted-foreground' />
                            <span className='truncate max-w-[100px] sm:max-w-[150px]'>
                              {order.whatsapp_number}
                            </span>
                          </div>
                        ) : (
                          <span className='text-muted-foreground text-sm'>
                            -
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <Gamepad2 className='h-4 w-4 mr-2 text-muted-foreground' />
                          {order.jenis_joki}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleViewDetails(order)}
                        >
                          <Eye className='h-4 w-4 mr-1' />
                          <span className='hidden sm:inline'>Detail</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4'>
            <div className='flex items-center space-x-2'>
              <p className='text-sm text-muted-foreground'>
                Menampilkan {startItem} - {endItem} dari {pagination.total} data
              </p>
            </div>

            <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
              <Select
                value={pagination.limit.toString()}
                onValueChange={handleLimitChange}
              >
                <SelectTrigger className='w-[100px]'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='5'>5</SelectItem>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='20'>20</SelectItem>
                  <SelectItem value='50'>50</SelectItem>
                </SelectContent>
              </Select>

              <div className='flex space-x-1'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1 || isFetching}
                >
                  <span className='hidden sm:inline'>Sebelumnya</span>
                  <span className='sm:hidden'>Prev</span>
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={
                    pagination.page === pagination.totalPages || isFetching
                  }
                >
                  <span className='hidden sm:inline'>Selanjutnya</span>
                  <span className='sm:hidden'>Next</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <OrderDetail
        orderId={selectedOrderId}
        open={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default OrdersList;
