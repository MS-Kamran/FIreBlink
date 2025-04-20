import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Images } from '../utils/images';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(#5b1900 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              opacity: 0.1
            }}
          />
          <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-[#ff4c00]/5 blur-3xl" />
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-[#5b1900]/5 blur-3xl" />
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
              className="h-1 w-16 bg-[#ff4c00] mb-8 mx-auto"
            />
            <h1 className="text-5xl md:text-6xl font-light text-[#5b1900] mb-6">
              Our Work – Supplying Success Across Industries
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-12">
              Over 5+ years of delivering excellence to corporate clients in Dhaka
            </p>
          </motion.div>
        </div>
      </section>

      {/* Add stats section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#ff4c00] mb-2">200+</div>
          <div className="text-neutral-600">Successful Supply Deals</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#ff4c00] mb-2">100%</div>
          <div className="text-neutral-600">Client Satisfaction</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#ff4c00] mb-2">5+</div>
          <div className="text-neutral-600">Years Experience</div>
        </div>
      </div>

      {/* Case Studies Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg 
                          transition-all duration-300"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-medium text-[#5b1900] mb-4">
                    {study.title}
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    {study.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="text-sm px-3 py-1 bg-[#5b1900]/5 text-[#5b1900] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-neutral-200 pt-6">
                    <blockquote className="italic text-neutral-600">
                      "{study.testimonial}"
                    </blockquote>
                    <p className="mt-2 text-sm text-[#5b1900]">
                      - {study.client}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-light text-[#5b1900] mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-neutral-600 mb-8">
              Let's discuss your requirements and create a customized solution
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#5b1900] text-white 
                       rounded-lg hover:bg-[#ff4c00] transition-colors duration-300"
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

// Sample data - Replace with your actual case studies
const caseStudies = [
  {
    title: "Corporate Supply Chain Management",
    description: "Streamlined supply chain operations for a major tech company, delivering high-quality products consistently.",
    tags: ["Supply Chain", "Corporate", "Management"],
    testimonial: "FireBlink delivered exceptional quality products on time and at competitive prices.",
    client: "Tech Corp Ltd."
  },
  {
    title: "Business Solutions Provider",
    description: "Provided comprehensive business solutions and supplies for a growing enterprise.",
    tags: ["Business Solutions", "Enterprise", "Supply"],
    testimonial: "Great service and product quality. Will definitely work with them again.",
    client: "Innovation Hub"
  }
];

export default Portfolio;