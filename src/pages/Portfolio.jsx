import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Images } from '../utils/images';
import { theme } from '../utils/theme';

const Portfolio = () => {
  // Pre-define image dimensions to prevent layout shifts
  const imageHeight = 250;
  
  const projects = [
    {
      title: "Corporate Supply Solutions",
      description: "Comprehensive supply solutions for major corporate clients.",
      imagePath: "/src/assets/image/Business.jpg",
      alt: "Corporate Supply Solutions showcase"
    },
    {
      title: "Supply Chain Management",
      description: "Efficient supply chain solutions for businesses.",
      imagePath: "/src/assets/image/supply map.jpg",
      alt: "Supply Chain Management showcase"
    },
    {
      title: "Corporate Events",
      description: "Professional event management and supplies.",
      imagePath: "/src/assets/image/Cake.jpg",
      alt: "Corporate Events showcase"
    }
  ];

  return (
    <section className="w-full flex justify-center py-8">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        {/* SEO-friendly header */}
        <header className="text-center mb-12">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-4" 
            style={{ color: theme.colors.primary }}
          >
            Our Portfolio
          </h1>
          <p 
            className="text-lg" 
            style={{ color: theme.colors.text.secondary }}
          >
            Showcasing Our Success Stories
          </p>
        </header>

        {/* Projects Grid with optimized images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              style={{ 
                backgroundColor: theme.colors.white,
                border: `1px solid ${theme.colors.border.light}`
              }}
            >
              <div 
                className="relative overflow-hidden"
                style={{ height: `${imageHeight}px` }}
              >
                <img 
                  src={project.imagePath} 
                  alt={project.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
              <div className="p-6">
                <h2 
                  className="text-xl font-semibold mb-2" 
                  style={{ color: theme.colors.primary }}
                >
                  {project.title}
                </h2>
                <p style={{ color: theme.colors.text.secondary }}>
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Testimonials Section */}
        <section className="mt-16">
          <h2 
            className="text-2xl font-semibold mb-8 text-center" 
            style={{ color: theme.colors.primary }}
          >
            Client Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "FireBlink has been an exceptional partner for our supply needs. Their professionalism and quality of service are outstanding.",
                author: "John Smith",
                company: "Tech Solutions Inc."
              },
              {
                text: "We've been working with FireBlink for over 2 years now. Their reliability and attention to detail make them our go-to supplier.",
                author: "Sarah Johnson",
                company: "Global Enterprises"
              }
            ].map((testimonial, index) => (
              <blockquote
                key={testimonial.author}
                className="p-6 rounded-lg"
                style={{ 
                  backgroundColor: theme.colors.white,
                  border: `1px solid ${theme.colors.border.light}`,
                  boxShadow: theme.shadows.sm
                }}
              >
                <p 
                  className="mb-4 italic" 
                  style={{ color: theme.colors.text.secondary }}
                >
                  "{testimonial.text}"
                </p>
                <footer>
                  <cite>
                    <p 
                      className="font-semibold" 
                      style={{ color: theme.colors.primary }}
                    >
                      {testimonial.author}
                    </p>
                    <p 
                      className="text-sm" 
                      style={{ color: theme.colors.text.light }}
                    >
                      {testimonial.company}
                    </p>
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

// Sample data - Replace with your actual case studies
const caseStudies = [
  {
    title: "Corporate Mobile Accessories Supply",
    description: "Provided bulk mobile accessories to a major tech company, including high-quality chargers, cases, and screen protectors.",
    tags: ["Mobile Accessories", "Bulk Supply", "Corporate"],
    testimonial: "FireBlink delivered exceptional quality products on time and at competitive prices.",
    client: "Tech Corp Ltd."
  },
  {
    title: "Annual Conference Catering",
    description: "Managed complete food service for a 3-day corporate conference with 500+ attendees.",
    tags: ["Event Catering", "Corporate Events", "Food Service"],
    testimonial: "The food quality and service were outstanding. Highly recommended!",
    client: "Global Solutions Inc."
  },
  {
    title: "Tech Startup Equipment Supply",
    description: "Supplied mobile accessories and equipment for a growing startup's office setup.",
    tags: ["Office Setup", "Mobile Accessories", "Bulk Supply"],
    testimonial: "Great service and product quality. Will definitely work with them again.",
    client: "Innovation Hub"
  },
  {
    title: "Corporate Training Event",
    description: "Provided full-day catering services for a corporate training event with specialized dietary requirements.",
    tags: ["Event Catering", "Corporate Training", "Specialized Menu"],
    testimonial: "Excellent attention to detail and accommodation of dietary restrictions.",
    client: "Learning Solutions Ltd."
  }
];

export default Portfolio;