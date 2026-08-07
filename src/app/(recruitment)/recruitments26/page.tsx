import registerForm from '@/components/recruitments26/registerForm';
import RoadToAlexa from '@/components/recruitments26/RoadToAlexa';
import Faq from '@/components/recruitments26/Faq';

export default function Recruitments26Page() {
    return (
        <main className="min-h-screen bg-black overflow-hidden">
            <registerForm />
            <RoadToAlexa />
            <Faq />
        </main>
    );
}