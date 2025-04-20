import { useEffect } from 'react';
import { Images } from '../utils/images';

const Preload = () => {
  useEffect(() => {
    // Preload critical fonts
    const fontPreloadLinks = [
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap', as: 'style' }
    ];

    // Preload critical images
    const imagePreloadLinks = [
      { href: Images.logo, as: 'image' },
      { href: Images.business, as: 'image' }
    ];

    // Create and append preload links
    [...fontPreloadLinks, ...imagePreloadLinks].forEach(link => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = link.href;
      preloadLink.as = link.as;
      if (link.as === 'image') {
        preloadLink.type = 'image/jpeg';
      }
      document.head.appendChild(preloadLink);
    });

    // Cleanup
    return () => {
      document.querySelectorAll('link[rel="preload"]').forEach(link => {
        document.head.removeChild(link);
      });
    };
  }, []);

  return null;
};

export default Preload; 