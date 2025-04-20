import { Link } from 'react-router-dom';
import { theme } from '../utils/theme';

const Footer = () => {
  return (
    <footer className="w-full bg-white" style={{ borderTop: `1px solid ${theme.colors.border.light}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/src/assets/logo/logo.png" 
                alt="FireBlink Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm mb-4 max-w-md" style={{ color: theme.colors.text.secondary }}>
              Delivering Excellence in Corporate Supplies – Mobile Accessories & Event Catering. 
              With over 5 years of experience, we provide reliable corporate supply solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: theme.colors.primary }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Portfolio', path: '/portfolio' },
                { label: 'Contact', path: '/contact' },
                { label: 'Privacy Policy', path: '/privacy-policy' }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-sm transition-colors hover:text-[#ff4c00]"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: theme.colors.primary }}>
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <strong>Address:</strong>
                <p>South Banasree, Dhaka, Bangladesh</p>
              </li>
              <li>
                <strong>Phone:</strong>
                <p>
                  <a 
                    href="tel:+880173101462" 
                    className="hover:text-[#ff4c00] transition-colors"
                  >
                    +880 1731-014620
                  </a>
                </p>
              </li>
              <li>
                <strong>Email:</strong>
                <p>
                  <a 
                    href="mailto:Fireblink007@gmail.com" 
                    className="hover:text-[#ff4c00] transition-colors"
                  >
                    Fireblink007@gmail.com
                  </a>
                </p>
              </li>
              <li>
                <strong>Business Hours:</strong>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 text-center sm:text-left sm:flex sm:justify-between sm:items-center" 
             style={{ borderTop: `1px solid ${theme.colors.border.light}` }}>
          <p className="text-sm mb-2 sm:mb-0" style={{ color: theme.colors.text.light }}>
            © {new Date().getFullYear()} FireBlink. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: theme.colors.text.light }}>
            Owned by Kazi Shariful Islam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;