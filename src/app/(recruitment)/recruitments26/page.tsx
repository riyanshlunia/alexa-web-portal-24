import RegisterForm from '@/components/recruitments26/registerForm';
import RoadToAlexa from '@/components/recruitments26/RoadToAlexa';
import DomainSection from '@/components/recruitments26/DomainSection';
import ContactUs from '@/components/recruitments26/ContactUs';

export default function Recruitments26Page() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <RegisterForm />
      <RoadToAlexa />
      <DomainSection />
      <ContactUs />
    </main>
  );
}