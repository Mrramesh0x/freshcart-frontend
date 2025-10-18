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

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
        name,
        email,
        password
      })

      if (res.status === 200) {
        setMessage(res.data.messeage || "Signup Success 🎉")
        router.push("/signup/verify")
      }
    } catch (err) {
      console.log(err)
      setMessage(err.response.data.message)
    }
  }

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSignup}>
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

        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        {message && <p className="signup-message">{message}</p>}
      </form>
    </div>
  )
}
