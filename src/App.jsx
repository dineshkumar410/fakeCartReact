/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetching json results from external API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Checking if product already exists in the cart and adding it
  const addToCart = (product) => {
    const isAlreadyInCart = cart.some((item) => item.id === product.id);
    if (isAlreadyInCart) {
      alert("Item already added to the cart");
    } else {
      setCart([...cart, product]);
    }
  };

  // Removing prodduct from the cart with respect to it's id
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Modal window control
  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    //Main JSX
    <div className="app">
      <Navbar cartCount={cart.length} toggleCartModal={toggleCartModal} />
      <ProductList products={products} addToCart={addToCart} />
      {isCartOpen && (
        <CartModal
          cart={cart}
          removeFromCart={removeFromCart}
          toggleCartModal={toggleCartModal}
        />
      )}
    </div>
  );
}

function Navbar({ cartCount, toggleCartModal }) {
  return (
    <nav className="navbar">
      <h1>Fake Cart</h1>
      <button className="cart-button" onClick={toggleCartModal}>
        Cart ({cartCount})
      </button>
    </nav>
  );
}

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <div className="price">
        <p>${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

function CartModal({ cart, removeFromCart, toggleCartModal }) {
  return (
    // General modal template
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={toggleCartModal}>
          &times;
        </span>
        <h2>Cart</h2>
        {/* Conditionally rendering the items respect to existence of the items in the cart */}
        {cart.length === 0 ? (
          <p className="empty">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
