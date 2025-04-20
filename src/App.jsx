import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Images } from './utils/images';
// We're not using these logos, so they can be removed
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical images
    const preloadImages = async () => {
      try {
        await Promise.all([
          new Promise((resolve) => {
            const img = new Image();
            img.src = Images.logo;
            img.onload = resolve;
          })
        ]);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
      setTimeout(() => setIsLoading(false), 800);
    };

    preloadImages();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#FDFBF7] flex items-center justify-center">
        <div className="relative w-full max-w-md px-4">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <img
                src={Images.logo}
                alt="FireBlink Logo"
                className="h-24 w-auto mx-auto transform-gpu"
              />
            </motion.div>

            {/* Loading Dots */}
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#5b1900] transform-gpu"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-[#5b1900] text-sm font-medium"
            >
              Preparing Excellence
            </motion.div>
          </motion.div>

          {/* Simplified Decorative Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="absolute w-24 h-24 transform-gpu"
                style={{
                  top: i < 2 ? '-1rem' : 'auto',
                  bottom: i >= 2 ? '-1rem' : 'auto',
                  left: i % 2 === 0 ? '-1rem' : 'auto',
                  right: i % 2 === 1 ? '-1rem' : 'auto',
                  background: `radial-gradient(circle, ${i % 2 === 0 ? '#5b1900' : '#ff4c00'} 0%, transparent 70%)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router basename="/FireBlink">
      <div className="min-h-screen w-full bg-[#F8F9FA]">
        <Navbar />
        <AnimatePresence mode="wait">
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              {/* Redirect any unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
