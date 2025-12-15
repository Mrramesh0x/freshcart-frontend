"use client"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "https://freshcart-backend-9bxk.onrender.com/api/signup",
        { name, email, password },
        { withCredentials: true }
      )
      console.log(res)
      setMessage("Signup successful! Redirecting to verification...")
      setTimeout(() => router.push("/signup/verify"), 1500)
    } catch (error) {
      console.error(error)
      setMessage("Signup failed. Try again.")
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2 className="signup-title">Sign Up</h2>

        <input
          type="text"
          placeholder="Enter your name"
          className="signup-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" onClick={handleSignup} className="signup-btn">
          Sign Up
        </button>

        {message && <p className="signup-message">{message}</p>}
      </div>
    </div>
  )
}
