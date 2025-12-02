import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';

export function HeroSection() {
  return (
    <section className='relative min-h-screen overflow-hidden text-foreground'>
      {/* Latar belakang */}
      <div className='absolute inset-0 z-0'>
        <AnimatedGridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          strokeDasharray={0}
          numSquares={30}
          maxOpacity={0.15}
          duration={1}
          className={cn(
            'mask-[radial-gradient(ellipse_at_center,white_10%,transparent_70%)]',
            'inset-x-1 inset-y-[-0%] h-full skew-y-12'
          )}
        />
      </div>

      {/* Konten utama */}
      <div className='relative z-10 h-screen flex items-center justify-center'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <Badge variant='secondary' className='mb-6'>
              Joki Roblox Terpercaya Sejak 2020
            </Badge>

            <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
              Joki <span className='text-accent-foreground'>Roblox</span>{' '}
              <span className='text-accent-foreground'>Zem Store</span>
            </h1>

            <p className='text-base md:text-lg text-muted-foreground mb-6 mx-auto leading-relaxed'>
              Naik level lebih cepat dengan layanan joki Roblox yang aman,
              cepat, dan terpercaya.
            </p>

            {/* Tombol aksi */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
              <Button size='lg' className='font-bold text-lg px-8 py-3'>
                Pesan Sekarang
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='bg-transparent font-bold text-lg px-8 py-3'
              >
                Daftar Joki
              </Button>
            </div>

            {/* Statistik */}
            <div className='grid grid-cols-3 gap-4 max-w-md mx-auto'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-accent-foreground'>
                  10K+
                </div>
                <div className='text-sm text-muted-foreground'>Pelanggan</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-accent-foreground'>
                  98%
                </div>
                <div className='text-sm text-muted-foreground'>Ratting</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-accent-foreground'>
                  24/7
                </div>
                <div className='text-sm text-muted-foreground'>Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
