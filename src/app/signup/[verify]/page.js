"use client"
import React, { useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/navigation"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleConfirm = async (e) => {
    e.preventDefault()
    if (!code) {
      toast.error("Please enter the verification code")
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verifyotp`, {
        code,
      })

      if (res.status === 200) {
        toast.success("Email verified successfully")
        setTimeout(() => {
           setTimeout(() => {
       router.push("/")
     }, 4000);
        }, 1500)
      } else {
        toast.error(res.data.message || "Verification failed")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/resendotp`)
      if (res.status === 200) {
        toast.info("Verification code resent")
      } else {
        toast.error(res.data.message || "Failed to resend code")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="verify-wrapper">
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="verify-container">
        <h2 className="verify-heading">Verify Your Email</h2>
        <p className="verify-subtext">Enter the 6-digit code sent to your email</p>

        <form className="verify-form" onSubmit={handleConfirm}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="verify-input"
            maxLength={6}
          />

          <p className="verify-resend">
            Didn’t get the code?{" "}
            <span onClick={handleResend} className="verify-resend-link">
              Resend Code
            </span>
          </p>

          <button type="submit" className="verify-btn" disabled={loading}>
            {loading ? "Verifying..." : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  )
}
