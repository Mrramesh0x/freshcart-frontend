"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const OrderDetail = ({ params }) => {
  const resolvedParams = React.use(params);
  const orderId = resolvedParams.orderid; 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first!");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  const handleCancel = async () => {
 try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      return;
    }

    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Order cancelled successfully!");
     setTimeout(() => {
       router.push("/orders")
     }, 3000);
  } catch (err) {
  }
  }
  const handleTrack = () => {
    toast.error("Tracking feature coming soon 🚚");
  };

  if (loading) return  <div className="page-loader">
      <div className="spinner"></div>
    </div>;
  if (!order) return <h2 className="not-found">Order not found</h2>;

  const { shippingAddress } = order;

  return (
    <div className="order-detail-page">
       <ToastContainer position="top-center" autoClose={1000} />
      <div className="order-detail-card">
        <h2 className="order-title">Order Details</h2>

        <div className="order-meta">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </p>
          <p>
            <strong>Total:</strong> ₹{order.totalAmount}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
        </div>

        {shippingAddress && (
          <div className="shipping-address">
            <h3>Shipping Address</h3>
            <p>{shippingAddress.landmark}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.state} -{" "}
              {shippingAddress.pincode}
            </p>
          </div>
        )}

        <h3 className="items-title">Items</h3>
        <div className="order-items">
          {order.items.map((item) => (
            <div key={item.productId} className="order-item">
              <div className="item-info">
                <p className="item-name">{item.name}</p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-actions">
          {order.status !== "Cancelled" && (
            <button
              className="btn cancel-btn"
              onClick={handleCancel}
              disabled={updating}
            >
              {updating ? "Cancelling..." : "Cancel Order"}
            </button>
          )}
          <button className="btn track-btn" onClick={handleTrack}>
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
