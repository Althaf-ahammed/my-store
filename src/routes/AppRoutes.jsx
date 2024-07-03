
import { Route, Routes } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';

function AppRoutes({ 
  currentProducts, 
  addToCart,
  removeFromCart,
  updateQuantity,
  currentPage, 
  filteredProducts, 
  productsPerPage, 
  paginate,
  cart,
  categories,
  selectedCategory,
  setSelectedCategory,
  loading 
}) {
  return (
    <Routes>
      <Route path="/" element={
        <HomeRoute 
          currentProducts={currentProducts.slice(0, 6)} 
          addToCart={addToCart}
          loading={loading}
        />
      } />
      <Route path="/products" element={
        <ProductsRoute 
          currentProducts={currentProducts} 
          addToCart={addToCart}
          currentPage={currentPage}
          filteredProducts={filteredProducts}
          productsPerPage={productsPerPage}
          paginate={paginate}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          loading={loading}
        />
      } />
      <Route path="/cart" element={
        <Cart 
          cart={cart} 
          removeFromCart={removeFromCart} 
          updateQuantity={updateQuantity}
          loading={loading}
        />
      } />
    </Routes>
  );
}

function HomeRoute({ currentProducts, addToCart, loading }) {
  return (
    <div className="flex-grow">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <ProductList products={currentProducts} addToCart={addToCart} loading={loading} />
    </div>
  );
}

function ProductsRoute({ 
    currentProducts, 
    addToCart, 
    currentPage, 
    filteredProducts, 
    productsPerPage, 
    paginate,
    categories,
    selectedCategory,
    setSelectedCategory,
    loading
  }) {
    return (
      <div className="flex-grow">
        <div className="mb-6">
          <FilterBar 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <ProductList products={currentProducts} addToCart={addToCart} loading={loading} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          onPageChange={paginate}
        />
      </div>
    );
  }

export default AppRoutes;