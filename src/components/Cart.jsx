
function Cart({ cart, removeFromCart, updateQuantity, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-gray-900">Your cart is empty</h3>
          <p className="mt-1 text-gray-500">Start adding some items to your cart!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
      <div className="space-y-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-2">${item.price.toFixed(2)} each</p>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition duration-150"
                >
                  -
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition duration-150"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg mb-1">${(item.price * item.quantity).toFixed(2)}</p>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-500 hover:text-red-700 transition duration-150"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Subtotal:</span>
          <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;