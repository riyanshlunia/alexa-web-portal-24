import HeroSection from '@/components/recruitments26/HeroSection';
import RoadToAlexa from '@/components/recruitments26/RoadToAlexa';
import DomainSection from '@/components/recruitments26/DomainSection';
import ContactUs from '@/components/recruitments26/ContactUs';

export default function Recruitments26Page() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <HeroSection />
      <DomainSection />
      <RoadToAlexa />
      <ContactUs />
    </main>
  );
}
