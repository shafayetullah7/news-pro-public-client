import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 justify-items-center md:grid-cols-4">
        <div className=" mb-8 md:mb-0">
          <Link
            to="/"
            className="font-abril text-3xl md:text-4xl border-b-4 border-gray-200 text-gray-200"
          >
            News Pro
          </Link>
        </div>
        <div className="md:ml-10 text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <p className="text-gray-400 mb-2">123 Main Street</p>
          <p className="text-gray-400 mb-2">City, State</p>
          <p className="text-gray-400 mb-2">Country</p>
        </div>
        <div className="md:ml-10 text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-400 mb-2">Email: info@example.com</p>
          <p className="text-gray-400 mb-2">Phone: 123-456-7890</p>
        </div>
        <div className="md:ml-10">
        <h2 className="text-xl font-semibold mb-4">Social</h2>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-gray-400 hover:text-white" />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-gray-400 hover:text-white" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-gray-400 hover:text-white" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} News Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
