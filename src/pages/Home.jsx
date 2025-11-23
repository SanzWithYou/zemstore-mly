import { HeroSection } from '@/components/sections/HeroSecrion';
import JokiOrderForm from '@/components/order/JokiOrderForm';
import JokiVariant1 from '@/components/joki/JokiVariant1';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <JokiVariant1 />
      <JokiOrderForm />
    </div>
  );
}
