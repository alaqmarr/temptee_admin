import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Welcome to Mystore!</h4>
                            <p className="text-gray-600">
                                This platform is powered by ALAQMAR.DEV, a place to manage all your online store needs. From contact form data to products and orders, this platform has you covered.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Policies, Terms & Conditions</h4>
                            <ul className="space-y-2">
                                <li><a href="/privacy-policy" className="text-gray-600 hover:text-gray-800">Privacy Policy</a></li>
                                <li><a href="/refund-cancellation" className="text-gray-600 hover:text-gray-800">Refunds and Cancellations</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                            <p className="text-gray-600">
                                Email: <a href="mailto:info@alaqmar.dev" className="text-blue-500 hover:text-blue-600">info@alaqmar.dev</a>
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                            <ul className="space-y-2">
                                <li><a href="https://instagram.com/alaqmarr_" className="text-gray-600 hover:text-gray-800">Instagram</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-gray-800">BlueSky</a></li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer
