"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, setCart } from "../store/cartReducer.js";
import { checkAuth } from "../checkauth/checkauth.js";
import Link from "next/link";
import { useRouter } from "next/navigation.js";

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  const [quantities, setQuantities] = useState({}); 


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const savedQty = JSON.parse(localStorage.getItem("cartQuantities")) || {};

    if (savedCart.length > 0) {
      dispatch(setCart(savedCart)); 
    }

    setQuantities(savedQty);
  }, [dispatch]);


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));
  }, [items, quantities]);

  const handleRemove = (id) => {
    dispatch(remove(id));
  };


  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };


  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * (quantities[item._id] || 1),
    0
  );

  const handleCheck = () => {
  
    localStorage.setItem("cartItems", JSON.stringify(items));
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));
    checkAuth();
   router.push("/cart/orderpage")
  
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2 className="cart-title">Your Shopping Cart</h2>
        <Link href="/" className="back-home">← Continue Shopping</Link>
      </div>

      {items.length > 0 ? (
        <div className="cart-container">
          <div className="cart-items">
            {items.map((p) => (
              <div key={p._id} className="cart-item">
                <div className="cart-item-img">
                  <img 
                    src={p.image || (p.images && p.images[0]?.url) || "/placeholder.png"} 
                    alt={p.name} 
                  />
                </div>
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{p.name}</h3>
                  <p className="cart-item-price">₹{p.price}</p>
                  
          
                  <div className="cart-qty">
                    <button className="qty-btn" onClick={() => decreaseQty(p._id)}>-</button>
                    <span className="qty-value">{quantities[p._id] || 1}</span>
                    <button className="qty-btn" onClick={() => increaseQty(p._id)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total Items: <strong>{items.length}</strong></p>
            <p>Total Price: <strong>₹{totalPrice}</strong></p>
            <button onClick={handleCheck} className="buy-btn">Buy Now</button>
          </div>
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty 🛒</p>
      )}
    </div>
  );
};

export default Cart;
