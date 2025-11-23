import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { useCustomServiceRequest } from './hooks/useCustomServiceRequest';

// Form component
const ServiceRequestForm = ({ onSuccess }) => {
  // Custom hook
  const { isSubmitting, submitRequest } = useCustomServiceRequest();

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      service: '',
    },
    mode: 'onBlur',
  });

  // Submit handler
  const onFormSubmit = (data) => {
    submitRequest(data, onSuccess);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-4'>
      {/* Name field */}
      <div className='space-y-2'>
        <Label htmlFor='name'>Nama Lengkap</Label>
        <Input
          {...register('name', { required: 'Nama wajib diisi' })}
          type='text'
          placeholder='zemmmbudd'
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className='text-sm text-red-500'>{errors.name.message}</p>
        )}
      </div>

      {/* Email field */}
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          {...register('email', {
            required: 'Email wajib diisi',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email tidak valid',
            },
          })}
          type='email'
          placeholder='zemstore@example.com'
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className='text-sm text-red-500'>{errors.email.message}</p>
        )}
      </div>

      {/* Service description */}
      <div className='space-y-2'>
        <Label htmlFor='service'>Deskripsi Layanan yang Dibutuhkan</Label>
        <Textarea
          {...register('service', {
            required: 'Deskripsi layanan wajib diisi',
            minLength: {
              value: 10,
              message: 'Minimal 10 karakter',
            },
          })}
          placeholder='Jelaskan secara detail layanan joki yang Anda butuhkan...'
          disabled={isSubmitting}
          rows={4}
        />
        {errors.service && (
          <p className='text-sm text-red-500'>{errors.service.message}</p>
        )}
      </div>

      {/* Submit button */}
      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className='h-4 w-4 animate-spin' />
            Memproses...
          </>
        ) : (
          <>
            <Send className='h-4 w-4 mr-2' />
            Kirim Permintaan
          </>
        )}
      </Button>
    </form>
  );
};

export default ServiceRequestForm;
