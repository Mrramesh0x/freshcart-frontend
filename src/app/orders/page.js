"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <h2 className="orders-loading">Loading Orders...</h2>;
  if (error) return <h2 className="orders-error">Login to view orders</h2>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) =>
            order.items.map((item) => (
              <div
                key={item.productId}
                className="order-card"
                onClick={() => router.push(`/orders/${order._id}`)}
              >
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="order-item-img"
                />
                <span className="order-item-name">{item.name}</span>
                <span className="order-arrow">›</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
