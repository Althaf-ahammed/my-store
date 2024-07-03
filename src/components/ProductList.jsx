
import ProductCard from './ProductCard';

function ProductList({ products, addToCart, loading }) {
  if (loading) {
    return (
      <div className="w-full text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default ProductList;