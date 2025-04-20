import React from 'react';
import { images } from '../utils/images';

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="w-full py-4 px-6 flex items-center justify-between bg-white shadow-md">
        <img src={images.logo} alt="FireBlink Logo" className="h-12" />
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <img src={images.business} alt="Business" className="w-full rounded-lg shadow-lg" />
          <img src={images.cake} alt="Cake" className="w-full rounded-lg shadow-lg" />
          <img src={images.mobileAll} alt="Mobile and All" className="w-full rounded-lg shadow-lg" />
        </div>
      </main>
    </div>
  );
}

export default Home; 