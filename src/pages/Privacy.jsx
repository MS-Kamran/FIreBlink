const Privacy = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Privacy <span className="text-accent">Policy</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your Privacy is Important to Us
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg">
            <h2 className="text-3xl font-bold text-primary mb-6">Introduction</h2>
            <p className="text-gray-600 mb-8">
              At FireBlink, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website or services.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8">
              <li>Name and contact information</li>
              <li>Company details</li>
              <li>Order and transaction information</li>
              <li>Communication preferences</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the collected information for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8">
              <li>Processing your orders and providing services</li>
              <li>Communicating about your orders and services</li>
              <li>Sending promotional materials (with your consent)</li>
              <li>Improving our products and services</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6">Information Security</h2>
            <p className="text-gray-600 mb-8">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6">Third-Party Services</h2>
            <p className="text-gray-600 mb-8">
              We may use third-party services to process payments, analyze website traffic, or provide other services. These providers have their own privacy policies governing the use of your information.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-8">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">Email: privacy@fireblink.com</p>
              <p className="text-gray-600">Phone: (123) 456-7890</p>
              <p className="text-gray-600">Address: 123 Business Street, Suite 456, City, State 12345</p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Last updated: January 2024
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;