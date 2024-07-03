
function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">{product.description}</p>
        <p className="text-blue-600 font-bold mb-2">Price: ${product.price}</p>
        <button 
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;