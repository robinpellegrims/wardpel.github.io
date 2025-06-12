import Layout from '@/components/Layout'; // Using the alias @ for src
import About from '@/components/About';
import Coaching from '@/components/Coaching';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <Layout>
      <About />
      <Coaching />
      <Projects />
      <Contact />
    </Layout>
  );
}
