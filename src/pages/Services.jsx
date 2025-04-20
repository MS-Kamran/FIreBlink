import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(#8B4513 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              opacity: 0.1
            }}
          />
          <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-secondary/5 blur-3xl" />
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-primary/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 w-16 bg-secondary mb-8 mx-auto"
            />
            <h1 className="text-5xl md:text-6xl font-light text-primary mb-6">
              Our Services
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-12">
              Professional mobile accessories supply and event catering solutions for corporate needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mobile Accessories Supply */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg 
                        transition-all duration-300"
            >
              <div className="w-12 h-12 mb-6 text-primary group-hover:text-secondary 
                            transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-primary mb-4">
                Mobile Accessories Supply
              </h2>
              <p className="text-neutral-600 mb-6">
                We provide a wide range of high-quality mobile accessories for corporate needs.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">Products</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Phone chargers & adapters
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      USB cables & OTG devices
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Power banks
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Bluetooth headphones & speakers
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mobile covers and screen protectors
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">Perfect for</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Corporate gifting
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Employee kits
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Conference giveaways
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-600">
                      📍 Bulk orders available with customizable packaging options.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Event Food Supply */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg 
                        transition-all duration-300"
            >
              <div className="w-12 h-12 mb-6 text-primary group-hover:text-secondary 
                            transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-primary mb-4">
                Corporate Event Catering
              </h2>
              <p className="text-neutral-600 mb-6">
                We specialize in professional corporate event catering, offering hygienic, delicious, and customized menus for all your business gatherings.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">Services for</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Corporate meetings & seminars
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Product launches
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Annual company dinners
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Office lunches & more
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">Why choose us</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Fresh ingredients, always
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Customizable menu options
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      On-time delivery
                    </li>
                    <li className="flex items-center text-neutral-600">
                      <svg className="w-5 h-5 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Professional service
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-light text-primary mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-neutral-600 mb-8">
              Let's discuss your requirements and create a customized solution for your business
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white 
                       rounded-lg hover:bg-secondary transition-colors duration-300"
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const services = [
  {
    title: "Mobile Accessories Supply",
    description: "High-quality mobile accessories for corporate needs",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
      </svg>
    ),
    features: [
      "Phone chargers & adapters",
      "USB cables & OTG devices",
      "Power banks",
      "Bluetooth headphones & speakers",
      "Mobile covers and screen protectors",
      "Corporate gifting solutions",
      "Employee kits",
      "Conference giveaways",
      "Bulk orders available",
      "Customizable packaging options"
    ]
  },
  {
    title: "Event Food Supply",
    description: "Professional catering services for corporate events",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
      </svg>
    ),
    features: [
      "Corporate meetings & seminars",
      "Product launches",
      "Annual company dinners",
      "Office lunches",
      "Fresh ingredients, always",
      "Customizable menu options",
      "Flexible budgeting",
      "Professional service",
      "On-time delivery",
      "Hygienic preparation"
    ]
  }
];

export default Services;