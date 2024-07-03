import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ searchTerm, setSearchTerm }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wider hover:text-blue-200 transition duration-300">
            MyStore
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li><Link to="/" className="hover:text-blue-200 transition duration-300">Home</Link></li>
                <li><Link to="/products" className="hover:text-blue-200 transition duration-300">Products</Link></li>
                <li><Link to="/cart" className="hover:text-blue-200 transition duration-300">Cart</Link></li>
              </ul>
            </nav>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-full text-black w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <svg className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="mb-4">
              <ul className="flex flex-col space-y-2">
                <li><Link to="/" className="block hover:text-blue-200 transition duration-300">Home</Link></li>
                <li><Link to="/products" className="block hover:text-blue-200 transition duration-300">Products</Link></li>
                <li><Link to="/cart" className="block hover:text-blue-200 transition duration-300">Cart</Link></li>
              </ul>
            </nav>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-full text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <svg className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;