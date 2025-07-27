import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-gray-300 pt-12 pb-6">
      {/* Top Highlight */}
      <div className="text-center mb-8">
        <h3 className="text-yellow-400 text-2xl font-semibold">
          🚗 Trusted Garage Since Established
        </h3>
        <p className="text-gray-400 mt-2">Serving with honesty and excellence from years</p>
      </div>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* About */}
        <div>
          <h4 className="text-lg font-semibold text-yellow-400 mb-4">About AutoFix</h4>
          <p className="text-gray-400">
            AutoFix Garage provides reliable car repair and maintenance with certified professionals. We're here to keep you on the road safely.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-yellow-400 mb-4">Contact Us</h4>
          <p>📞 +91 98765 43210</p>
          <p>✉️ support@autofixgarage.com</p>
          <p>📍 Hyderabad, Telangana</p>
          <p className="mt-2 text-yellow-400 font-medium">Available 24/7 for support</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="/form" className="hover:text-yellow-400 transition">Book Appointment</a></li>
            <li><a href="/contact-us" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} AutoFix Garage. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
