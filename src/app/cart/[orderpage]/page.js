"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter()
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState({
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD"); 
 const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [savedAddresses, setSavedAddresses] = useState([]);

useEffect(() => {
  setToken(localStorage.getItem("token"));
}, []);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const savedQuantities =
      JSON.parse(localStorage.getItem("cartQuantities")) || {};
    setCartItems(savedItems);
    setQuantities(savedQuantities);

    const total = savedItems.reduce(
      (total, item) => total + item.price * (savedQuantities[item._id] || 1),
      0
    );
    setTotalPrice(total);
  }, []);


  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/addresses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedAddresses(data);
      } catch (err) {
      }
    };
    if (token) fetchAddresses();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    try {
      if (!token) {
        toast.error("Please login first!");
        return;
      }


      const orderBody = {
        items: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: quantities[item._id] || 1,
        })),
        totalAmount: totalPrice,
        shippingAddress: address,
        paymentMethod,
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/createorders`,
        orderBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully!");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartQuantities");
     setTimeout(() => {
       router.push("/orders")
     }, 3000);
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  return (
    <div className="checkout-page">
       <ToastContainer position="top-center" autoClose={1000} />
      <div className="checkout-container">
        <div className="checkout-section">
          <h3>Shipping Address</h3>

          {savedAddresses.length > 0 && (
            <div className="saved-addresses">
              <h4>Saved Addresses</h4>
              {savedAddresses.map((addr, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="savedAddress"
                    onChange={() => setAddress(addr)}
                  />
                  {addr.landmark}, {addr.city}, {addr.state} - {addr.pincode}
                </label>
              ))}
            </div>
          )}

          <h4>Enter Address</h4>
          <div className="new-add">
            <input
              type="text"
              placeholder="Landmark"
              name="landmark"
              value={address.landmark}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Pincode"
              name="pincode"
              value={address.pincode}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              value={address.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={address.state}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="checkout-section">
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Debit Card
            </label>
          </div>
        </div>

        <div className="checkout-section order-summary">
          <h3>Order Summary</h3>
          <p>
            Total Price: <strong>₹{totalPrice}</strong>
          </p>
          <label className="email-verify">{error}</label>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
