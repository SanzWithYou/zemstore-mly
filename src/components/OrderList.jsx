import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewVariant, setPreviewVariant] = useState('compact'); // 'compact' or 'wide'
  const [deleteLoading, setDeleteLoading] = useState(null); // Untuk melacak order yang sedang dihapus

  // Fungsi untuk mengambil data order
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3000/api/orders');

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(
        err.response?.data?.message || 'Terjadi kesalahan saat mengambil data'
      );
    } finally {
      setLoading(false);
    }
  };

  // Mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchOrders();
  }, []);

  // Fungsi untuk refresh data
  const handleRefresh = () => {
    fetchOrders();
  };

  // Fungsi untuk format nama file
  const formatFileName = (path) => {
    if (!path) return '-';
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  // Fungsi untuk preview bukti transfer
  const handlePreview = (path) => {
    if (!path) return;

    // Build file URL
    const fileUrl = `http://localhost:3000/api/files/${path}`;

    // Set preview file data
    setPreviewFile({
      url: fileUrl,
      name: formatFileName(path),
      path: path,
    });
  };

  // Fungsi untuk download file
  const handleDownload = (path) => {
    if (!path) return;

    // Build file URL dengan parameter download=true
    const fileUrl = `http://localhost:3000/api/files/${path}?download=true`;

    // Create temporary link untuk download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = formatFileName(path);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fungsi untuk menutup preview
  const closePreview = () => {
    setPreviewFile(null);
  };

  // Fungsi untuk menghapus order
  const handleDelete = async (id) => {
    // Konfirmasi sebelum menghapus
    if (!window.confirm('Apakah Anda yakin ingin menghapus order ini?')) {
      return;
    }

    setDeleteLoading(id);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/orders/${id}`
      );

      if (response.data.success) {
        // Update state dengan menghapus order yang sudah dihapus
        setOrders(orders.filter((order) => order.id !== id));
      } else {
        setError(response.data.message || 'Gagal menghapus order');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(
        err.response?.data?.message || 'Terjadi kesalahan saat menghapus order'
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // Fungsi untuk mendeteksi tipe file
  const getFileType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      return 'image';
    } else if (ext === 'pdf') {
      return 'pdf';
    }
    return 'other';
  };

  // Fungsi untuk toggle variant
  const toggleVariant = () => {
    setPreviewVariant((prev) => (prev === 'compact' ? 'wide' : 'compact'));
  };

  if (loading) {
    return (
      <div className='max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
        <div className='text-center'>
          <div className='text-red-500 mb-4'>❌ {error}</div>
          <button
            onClick={handleRefresh}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Daftar Order</h2>
        <button
          onClick={handleRefresh}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center'
        >
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            />
          </svg>
          Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          Belum ada data order
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Jenis Joki
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Bukti Transfer
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {orders.map((order) => (
                <tr key={order.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    #{order.id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {order.joki}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    <div className='flex items-center'>
                      <span className='mr-2'>📎</span>
                      {formatFileName(order.bukti_transfer)}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button
                      onClick={() => handlePreview(order.bukti_transfer)}
                      className='text-blue-600 hover:text-blue-900 mr-3'
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownload(order.bukti_transfer)}
                      className='text-green-600 hover:text-green-900 mr-3'
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      disabled={deleteLoading === order.id}
                      className={`${
                        deleteLoading === order.id
                          ? 'text-gray-400'
                          : 'text-red-600 hover:text-red-900'
                      }`}
                    >
                      {deleteLoading === order.id ? (
                        <span className='flex items-center'>
                          <svg
                            className='animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                            ></circle>
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                          </svg>
                          Menghapus...
                        </span>
                      ) : (
                        'Hapus'
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className='mt-4 text-sm text-gray-500'>
        Total: {orders.length} order
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          {/* PENANDA: Modal container - Menyesuaikan ukuran sesuai konten */}
          <div className='bg-white rounded-lg min-w-[300px] min-h-[400px] max-w-[90vw] max-h-[90vh] overflow-hidden shadow-2xl flex flex-col'>
            {/* Modal Header - Sticky */}
            <div className='sticky top-0 z-10 flex justify-between items-center p-6 border-b bg-gray-50 backdrop-blur-sm bg-opacity-95'>
              <div>
                <h3 className='text-xl font-semibold text-gray-800'>
                  Preview Bukti Transfer
                </h3>
                <p className='text-sm text-gray-600 mt-1'>{previewFile.name}</p>
              </div>
              <div className='flex items-center gap-3'>
                <button
                  onClick={toggleVariant}
                  className='text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition-colors'
                >
                  {previewVariant === 'compact' ? 'Wide View' : 'Compact View'}
                </button>
                <button
                  onClick={closePreview}
                  className='text-gray-400 hover:text-gray-600 transition-colors'
                >
                  <svg
                    className='w-8 h-8'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className='flex-1 overflow-auto bg-gray-50'>
              {getFileType(previewFile.name) === 'pdf' ? (
                <div className='flex justify-center min-h-[70vh]'>
                  <iframe
                    src={previewFile.url}
                    className='w-full h-full border rounded'
                    title={previewFile.name}
                  />
                </div>
              ) : (
                <div className='flex flex-col items-center'>
                  {/* Variant 1: Compact View (Default) */}
                  {previewVariant === 'compact' && (
                    <div className='w-[250px] max-w-full'>
                      {/* PENANDA: Aspect Ratio untuk Compact View - Ubah ratio di sini */}
                      <AspectRatio
                        ratio={9 / 16}
                        className='bg-white border-2 border-gray-200 rounded-lg shadow-lg'
                      >
                        <img
                          src={previewFile.url}
                          alt={previewFile.name}
                          className='w-full h-auto object-cover'
                        />
                      </AspectRatio>
                    </div>
                  )}

                  {/* Variant 2: Wide View */}
                  {previewVariant === 'wide' && (
                    <div className='w-full max-w-3xl'>
                      {/* PENANDA: Aspect Ratio untuk Wide View - Ubah ratio di sini */}
                      <AspectRatio
                        ratio={9 / 16}
                        className='bg-white border-2 border-gray-200 rounded-lg shadow-lg'
                      >
                        <img
                          src={previewFile.url}
                          alt={previewFile.name}
                          className='w-full h-auto object-cover'
                        />
                      </AspectRatio>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer - Sticky */}
            <div className='sticky bottom-0 z-10 flex justify-between items-center p-6 border-t bg-gray-50 backdrop-blur-sm bg-opacity-95'>
              <div className='text-sm text-gray-500'>
                {previewVariant === 'compact' ? 'Compact View' : 'Wide View'} •
                Klik tombol Download untuk menyimpan file
              </div>
              <div className='flex gap-3'>
                <button
                  onClick={() => handleDownload(previewFile.path)}
                  className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center'
                >
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                    />
                  </svg>
                  Download
                </button>
                <button
                  onClick={closePreview}
                  className='bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors'
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
