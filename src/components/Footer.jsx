import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#5b1900] via-[#943100] to-[#ff4c00] text-white">
      {/* Premium Wave Effect */}
      <div className="absolute top-0 left-0 w-full overflow-hidden -mt-1 leading-0">
        <svg className="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-20">
        {/* Decorative elements */}
        <div className="relative mb-12">
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-24 w-48 h-48 bg-[#ff4c00]/20 rounded-full blur-3xl"></div>
          <div className="absolute left-1/4 transform -translate-x-1/2 -top-16 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
          <div className="absolute right-1/4 transform translate-x-1/2 -top-20 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl"></div>
          <div className="h-1 w-32 bg-gradient-to-r from-amber-400 to-[#ff4c00] mx-auto mb-6 relative rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-light text-white mb-6">
              <span className="text-amber-400 font-normal">Fire</span>Blink
            </h3>
            <p className="text-gray-100 leading-relaxed mb-6">
              Your trusted partner for corporate mobile accessories supply and event catering services.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.064-.926-2.064-2.065 0-1.138.92-2.063 2.064-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-normal text-amber-400 mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-100 hover:text-amber-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2 text-amber-400">•</span>About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-100 hover:text-amber-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2 text-amber-400">•</span>Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-100 hover:text-amber-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2 text-amber-400">•</span>Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-100 hover:text-amber-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2 text-amber-400">•</span>Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-100 hover:text-amber-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2 text-amber-400">•</span>Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-normal text-amber-400 mb-6 uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-4 text-gray-100">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-amber-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>South Banasree, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-amber-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>+880 173101462</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-amber-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>Fireblink007@gmail.com</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-amber-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#8b3d1a]/50 mt-12 pt-8 text-center">
          <p className="text-gray-100">&copy; {new Date().getFullYear()} <span className="text-amber-400 font-normal">Fire</span>Blink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;