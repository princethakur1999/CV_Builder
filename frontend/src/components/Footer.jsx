function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start space-y-6 md:space-y-0">
          {/* Logo Section */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold">CV Builder</h2>
            <p className="text-sm mt-2">
              Create professional resumes quickly and effortlessly.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89-3.89a2 2 0 011.8 0L21 8M16 10v10m-4-6v6M8 12v8m-4-4v4"
                  />
                </svg>
                +91 6202178657
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6m12 0h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 012-2h2"
                  />
                </svg>
                pk181200@gmail.com
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8c0-4.418-3.582-8-8-8S0 3.582 0 8c0 3.32 2.332 6.1 5.5 7.5L5 20h2v-4h1.5l.5 4h2v-3.5c3.168-1.4 5.5-4.18 5.5-7.5z"
                  />
                </svg>
                Bangaluru, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white mt-6"></div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <p className="text-sm text-center md:text-left">
            © 2024 CV Builder. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
