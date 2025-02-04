import Head from 'next/head';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Contact Us - MyStore</title>
        <meta name="description" content="Contact MyStore for inquiries, support, or feedback." />
      </Head>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          We're here to help! If you have any questions, concerns, or feedback, please feel free to reach out to us using the contact details below.
        </p>

        <div className="space-y-6">
          {/* Phone Number Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Phone</h2>
            <p className="text-gray-600">
              Call us at: <a href="tel:+919618443558" className="text-blue-500 hover:underline">+91 96184 43558</a>
            </p>
          </div>

          {/* Email Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Email</h2>
            <p className="text-gray-600">
              Email us at: <a href="mailto:info@alaqmar.dev" className="text-blue-500 hover:underline">info@alaqmar.dev</a>
            </p>
          </div>

          {/* Business Hours Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Business Hours</h2>
            <p className="text-gray-600">
              Monday - Friday: 9:00 AM - 6:00 PM (IST)
              <br />
              Saturday: 10:00 AM - 4:00 PM (IST)
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}