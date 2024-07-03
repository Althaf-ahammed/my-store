
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex rounded-md shadow">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-l-md border ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50'
          }`}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => onPageChange(page + 1)}
            className={`px-4 py-2 border-t border-b ${
              currentPage === page + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-r-md border ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50'
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
}

export default Pagination;