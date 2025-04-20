import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-accent mb-4">FireBlink</h3>
            <p className="text-sm">Delivering Excellence in Corporate Supplies – Mobile Accessories & Event Catering</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-accent mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-accent transition-colors duration-200">About Us</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors duration-200">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-accent transition-colors duration-200">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors duration-200">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors duration-200">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-accent mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm">
              <p>South Banasree, Dhaka, Bangladesh</p>
              <p>Email: Fireblink007@gmail.com</p>
              <p>Phone: 0173101462</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FireBlink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;