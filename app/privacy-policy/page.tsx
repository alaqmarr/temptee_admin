import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Privacy Policy - MyStore</title>
        <meta name="description" content="Privacy Policy for MyStore, outlining how we collect, use, and protect your information." />
      </Head>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">Last Updated: January 31, 2025</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-600 mb-4">
            Welcome to <strong>MyStore</strong> (hereinafter referred to as "we," "our," or "us"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you visit our website, <strong>mystore.alaqmar.dev</strong>.
          </p>
          <p className="text-gray-600">
            By using our website, you agree to the terms of this Privacy Policy. If you do not agree with the terms, please do not access or use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li><strong>Personal Information:</strong> Name, email address, phone number, and shipping address.</li>
            <li><strong>Payment Information:</strong> Credit/debit card details, UPI IDs, or other payment-related information.</li>
            <li><strong>Technical Information:</strong> IP address, browser type, device information, and cookies.</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on the site, and other analytics data.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use your information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>To process and fulfill your orders.</li>
            <li>To communicate with you about your orders, account, or inquiries.</li>
            <li>To improve our website and services.</li>
            <li>To comply with legal obligations and enforce our terms and conditions.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Data Sharing and Disclosure</h2>
          <p className="text-gray-600 mb-4">
            We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>With service providers who assist us in operating our website and providing services (e.g., payment processors, shipping companies).</li>
            <li>To comply with legal requirements or respond to lawful requests from government authorities.</li>
            <li>In connection with a business transfer, such as a merger or acquisition.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
          <p className="text-gray-600 mb-4">
            Under Indian law, you have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Right to access and review your data.</li>
            <li>Right to correct inaccuracies in your data.</li>
            <li>Right to withdraw consent for data processing.</li>
            <li>Right to request deletion of your data, subject to legal obligations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Cookies and Tracking Technologies</h2>
          <p className="text-gray-600 mb-4">
            We use cookies and similar technologies to enhance your experience on our website. You can manage your cookie preferences through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Changes to This Privacy Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-600">
            Email: <a href="mailto:info@alaqmar.dev" className="text-blue-500 hover:underline">info@alaqmar.dev</a>
          </p>
        </section>
      </div>
    </div>
  );
}