"use client"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>🛒 FreshCart</h2>
          <p>Groceries delivered to your doorstep in just 30 minutes.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/orders">My Orders</Link>
        </div>

        <div className="footer-links">
          <h4>Customer Care</h4>
          <Link href="/profile">My Account</Link>
          <Link href="/address">Saved Addresses</Link>
          <Link href="/support">Help & Support</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        <div className="footer-links">
          <h4>Legal</h4>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/refund">Refund Policy</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
      </div>
    </footer>
  )
}
