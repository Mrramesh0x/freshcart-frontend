"use client"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        email,
        password,
      })
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token)
      toast.success("Login successful")
        setTimeout(() => {
          window.location.href = "/"
        }, 2000);
      } else {
        setError(res.data.messeage || "Login failed")
      }
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.messeage || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
       <ToastContainer position="top-center" autoClose={1000} />
      <div className="login-container">
        <h2 className="login-heading">Login</h2>
        <form className="login-form-box" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input-field"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input-field"
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="login-signup-text">
          Don’t have an account?{" "}
          <a href="/signup" className="login-signup-link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}
