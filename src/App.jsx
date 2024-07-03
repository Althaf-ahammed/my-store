import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Pagination from './components/Pagination';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();
    fetchData();
  }, []);


  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchProducts(), fetchCategories(), fetchCart()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    setCategories(data);
  };

  const fetchCart = async () => {
    const response = await fetch('https://fakestoreapi.com/carts/1');
    const data = await response.json();
    const cartWithDetails = await Promise.all(
      data.products.map(async (item) => {
        const productResponse = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
        const productData = await productResponse.json();
        return { ...productData, quantity: item.quantity };
      })
    );
    setCart(cartWithDetails);
  };

  const addToCart = async (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let updatedCart;
  
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
  
    try {
      await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          date: new Date(),
          products: updatedCart.map(item => ({ productId: item.id, quantity: item.quantity }))
        })
      });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);

    await fetch('https://fakestoreapi.com/carts/1', {
      method: 'PUT',
      body: JSON.stringify({
        userId: 1,
        date: new Date(),
        products: updatedCart.map(item => ({ productId: item.id, quantity: item.quantity }))
      })
    });
  };

  const updateQuantity = async (productId, newQuantity) => {
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);

    // Update cart on the server
    try {
      await fetch('https://fakestoreapi.com/carts/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          date: new Date(),
          products: updatedCart.map(item => ({ productId: item.id, quantity: item.quantity }))
        })
      });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <div className="App min-h-screen bg-gray-100">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="container mx-auto px-4 py-8 flex">
          {loading ? (
            <div className="w-full text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading...</p>
            </div>
          ) : (
          <AppRoutes 
            currentProducts={currentProducts}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
            currentPage={currentPage}
            updateQuantity={updateQuantity}
            filteredProducts={filteredProducts}
            productsPerPage={productsPerPage}
            paginate={paginate}
            cart={cart}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            loading={loading}
          />
        )}
        </div>
      </div>
    </Router>
  );
}

export default App;