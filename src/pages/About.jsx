import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={theme.components.pageContainer}>
      <section className={theme.components.sectionContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-light text-[#5b1900] mb-6">
            Who We Are – Your Trusted Corporate Supply Partner
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-12">
            Delivering excellence in corporate supplies since 2018
          </p>
          
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={theme.components.card}
            >
              <h2 className="text-3xl font-light text-[#5b1900] mb-6">Our Story</h2>
              <p className="text-neutral-600 mb-4">
                Fire Blink was founded by Kazi Shariful Islam, a passionate entrepreneur with over 5 years of industry experience in delivering top-notch mobile accessories and event food services to leading corporate clients in South Banasree and beyond.
              </p>
              <p className="text-neutral-600 mb-4">
                We believe in quality, punctuality, and professionalism. Our strong relationships with clients stem from our consistent ability to meet expectations and deliver value.
              </p>
              <p className="text-neutral-600 mb-4">
                Whether you're organizing a seminar, corporate dinner, or need bulk accessories for your employees — Fire Blink ensures excellence, every time.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-[#5b1900] hover:bg-[#ff4c00] text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </motion.div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-2xl font-light text-[#5b1900] mb-6">Why Choose Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#ff4c00] mr-2">✓</span>
                  <span className="text-neutral-600">5+ years of industry experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ff4c00] mr-2">✓</span>
                  <span className="text-neutral-600">Premium quality products and services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ff4c00] mr-2">✓</span>
                  <span className="text-neutral-600">Dedicated customer support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ff4c00] mr-2">✓</span>
                  <span className="text-neutral-600">Competitive pricing</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-[#5b1900] text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-light text-[#5b1900] mb-4">Quality</h3>
              <p className="text-neutral-600">
                We never compromise on the quality of our products and services, ensuring the best value for our clients.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-light text-[#5b1900] mb-4">Innovation</h3>
              <p className="text-neutral-600">
                We constantly evolve and adapt to meet the changing needs of our corporate clients.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-light text-[#5b1900] mb-4">Reliability</h3>
              <p className="text-neutral-600">
                Our clients can count on us for consistent, timely, and professional service delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-light text-[#5b1900] mb-6">Ready to Experience Excellence?</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Join our growing list of satisfied corporate clients and discover the FireBlink difference.
          </p>
          <Link
            to="/services"
            className="inline-block bg-[#5b1900] hover:bg-[#ff4c00] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            View Our Services
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;