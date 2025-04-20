import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { Images } from './utils/images';
import { theme } from './utils/theme';
// We're not using these logos, so they can be removed
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center" style={{ color: theme.colors.primary }}>
    Loading...
  </div>
);

function App() {
  return (
    <Router basename="/FIreBlink">
      <div className="min-h-screen flex flex-col" style={{ background: theme.colors.background }}>
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
