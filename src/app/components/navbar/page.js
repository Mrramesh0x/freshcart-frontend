"use client"
import React, { useEffect, useState, useRef, useContext } from "react"
import Link from "next/link"
import { SlArrowDown } from "react-icons/sl"
import { FaRegUserCircle } from "react-icons/fa"
import { useSelector } from "react-redux"

export default function Navbar() {
  const items = useSelector((state) => state.cart)
  const [token, setToken] = useState(null) 
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    window.location.href = "/" 
  }

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Left Section */}
        <div className="left-section">
          <div className="logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">
              <Link className="Link" href={"/"}>
                FreshCart
              </Link>
            </span>
          </div>
          <div className="delivery-to">
            <div className="delivery-location">
              <span className="delivery-label">Delivering to</span>
              <div className="delivery-city-wrap">
                <span className="delivery-city">BIJNOR</span>
                <SlArrowDown className="down-arrow" />
              </div>
            </div>
          </div>
        </div>


        <div className="auth-buttons">
          <Link href="/cart">
            <button className="cart-nav-btn" data-count={items.length}>
              🛒 Cart
            </button>
          </Link>

          {token ? (
            <div className="user-menu" ref={menuRef}>
              <div
                className="user-icon"
                title="My Account"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FaRegUserCircle size={28} color="white" />
              </div>

              {menuOpen && (
                <div className="dropdown-menu">
                  <Link href="/orders" onClick={() => setMenuOpen(false)}>
                    My Orders
                  </Link>
                  <Link href="/profile" onClick={() => setMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link href="/address" onClick={() => setMenuOpen(false)}>
                    My Address
                  </Link>
                  <Link
                    href="/change-password"
                    onClick={() => setMenuOpen(false)}
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMenuOpen(false)
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <button className="login-nav-btn">Login</button>
              </Link>
              <Link href="/signup">
                <button className="signup-nav-btn">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
