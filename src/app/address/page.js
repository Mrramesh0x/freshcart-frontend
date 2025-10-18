"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/addresses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(data);
      } catch (err) {
      }
    };
    if (token) fetchAddresses();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
        newAddress,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAddresses(data);
      setShowForm(false);
      setNewAddress({ landmark: "", pincode: "", city: "", state: "" });
    } catch (err) {
      toast.error("Failed to save address");
    }
  };

  return (
    <div className="address-page">
       <ToastContainer position="top-center" autoClose={1000} />
      <div className="address-card-container">
        <h2 className="address-title">My Addresses</h2>

        {addresses.length === 0 && !showForm && (
          <div className="address-empty">
            <p>No saved addresses found.</p>
            <button
              className="address-btn add-btn"
              onClick={() => setShowForm(true)}
            >
              + Add Address
            </button>
          </div>
        )}

        {showForm && (
          <div className="address-form">
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={newAddress.landmark}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={newAddress.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={newAddress.state}
              onChange={handleInputChange}
            />
            <div className="form-actions">
              <button className="address-btn save-btn" onClick={handleAddAddress}>
                Save
              </button>
              <button
                className="address-btn cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {addresses.length > 0 && (
          <div className="address-list">
            {addresses.map((addr, idx) => (
              <div key={idx} className="address-card">
                <p>
                  {addr.landmark}, {addr.city}, {addr.state} - {addr.pincode}
                   <span className="remove-wrapper"><button className="remove-address">Delete</button></span>
                </p>
              </div>
            ))}
            {!showForm && (
              <button
                className="address-btn add-btn"
                onClick={() => setShowForm(true)}
              >
                + Add Another Address
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
