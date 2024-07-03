import { useState, useRef, useEffect } from 'react';

function FilterBar({ categories, selectedCategory, onCategoryChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
    setIsOpen(false);  // Close the filter after selection
  };

  return (
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 flex items-center"
      >
        <span className="mr-2">Filter</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul>
            <li className="mb-2">
              <button
                className={`w-full text-left py-2 px-4 rounded transition duration-300 ${
                  selectedCategory === '' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryChange('')}
              >
                All Categories
              </button>
            </li>
            {categories.map((category) => (
              <li key={category} className="mb-2">
                <button
                  className={`w-full text-left py-2 px-4 rounded transition duration-300 ${
                    selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FilterBar;