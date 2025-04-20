import { motion } from 'framer-motion';
import { theme } from '../utils/theme';

const About = () => {
  return (
    <div className="w-full flex justify-center py-8">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        {/* About Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.colors.primary }}>
            About FireBlink
          </h1>
          <p className="text-lg" style={{ color: theme.colors.text.secondary }}>
            Your Trusted Partner in Corporate Supply Solutions
          </p>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.colors.primary }}>
            Our Story
          </h2>
          <p className="mb-4" style={{ color: theme.colors.text.secondary }}>
            Founded with a vision to revolutionize the corporate supply industry, FireBlink has been serving businesses 
            in Bangladesh for over 5 years. Under the leadership of Kazi Shariful Islam, we've grown to become a 
            trusted name in corporate supply solutions.
          </p>
          <p style={{ color: theme.colors.text.secondary }}>
            Our journey began with a simple mission: to provide reliable, high-quality supply services to corporate 
            clients. Today, we're proud to be a leading supplier, known for our commitment to excellence and 
            customer satisfaction.
          </p>
        </motion.div>

        {/* Owner's Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.colors.primary }}>
            Leadership
          </h2>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2" style={{ color: theme.colors.secondary }}>
                Kazi Shariful Islam
              </h3>
              <p className="text-sm mb-2" style={{ color: theme.colors.text.light }}>
                Founder & CEO
              </p>
              <p style={{ color: theme.colors.text.secondary }}>
                With over 5 years of industry experience, Kazi Shariful Islam has led FireBlink to become 
                a prominent name in the corporate supply sector. His vision and commitment to quality have 
                been the driving force behind our success.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.colors.primary }}>
            Why Choose FireBlink
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Experience & Expertise",
                description: "Over 5 years of industry experience serving corporate clients."
              },
              {
                title: "Quality Assurance",
                description: "Rigorous quality control measures for all our products and services."
              },
              {
                title: "Reliable Service",
                description: "Consistent and timely delivery with professional support."
              },
              {
                title: "Customer Satisfaction",
                description: "Strong focus on meeting and exceeding client expectations."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg"
                style={{ 
                  backgroundColor: theme.colors.white,
                  boxShadow: theme.shadows.sm,
                  border: `1px solid ${theme.colors.border.light}`
                }}
              >
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.secondary }}>
                  {item.title}
                </h3>
                <p style={{ color: theme.colors.text.secondary }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;