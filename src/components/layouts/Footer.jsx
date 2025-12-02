import { Button } from '@/components/ui/button';
import ModeToggle from '../theme/ModeToggle';
import { toast } from 'sonner';
import { socialData } from './data/SosialData';

// Komponen footer
export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Tangani klik sosial
  const handleSocialClick = (social) => {
    if (social.copyText) {
      navigator.clipboard.writeText(social.copyText);
      toast.success(`${social.label} berhasil disalin!`);
    } else if (social.href) {
      window.open(social.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className='bg-muted/30 border-t border-border'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='col-span-1 md:col-span-2'>
            <div className='select-none mb-4'>
              <h1 className='text-xl font-bold tracking-wide'>Zem Store</h1>
            </div>
            <p className='text-sm text-muted-foreground max-w-md'>
              Layanan joki game terpercaya dengan harga terjangkau. Kami
              menyediakan berbagai layanan joki untuk game Blox Fruit Roblox
              dengan proses cepat dan aman.
            </p>
          </div>

          <div>
            <h3 className='font-semibold mb-4 text-sm'>Kontak Kami</h3>

            <div className='flex flex-wrap gap-3'>
              {socialData.map((social) => (
                <Button
                  key={social.id}
                  variant='ghost'
                  size='icon'
                  className='rounded-full'
                  onClick={() => handleSocialClick(social)}
                  title={social.copyText || social.href}
                >
                  <social.icon className='h-4 w-4' />
                  <span className='sr-only'>{social.label}</span>
                </Button>
              ))}
            </div>

            <div className='mt-3 text-sm text-muted-foreground'>
              <span>
                Klik ikon untuk{' '}
                {socialData.some((s) => s.copyText) ? 'menyalin atau ' : ''}
                mengunjungi
              </span>
            </div>
          </div>
        </div>

        <div className='border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-xs text-muted-foreground'>
            © {currentYear} Zem Store. Hak Cipta Dilindungi.
          </p>
          <div className='flex items-center gap-4 mt-4 md:mt-0'>
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
