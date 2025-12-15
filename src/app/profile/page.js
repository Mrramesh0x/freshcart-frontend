"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter()
   const handleRedirect = async () =>{
router.push("/signup/verify")
   }

  useEffect(() => {
  const token = localStorage.getItem("token");
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (err) {
        toast.error("Please login to view your profile");
      }
    };

    if (token) fetchProfile();
  }, []);

  if (!user) return  <div className="page-loader">
      <div className="spinner"></div>
    </div>;

  return (
    <div className="profile-page">
       <ToastContainer position="top-center" autoClose={1000} />
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-info">
          <p>
            <span className="profile-label">Name:</span> {user.name}{" "}
            <button className="change-btn">Change</button>
          </p>

          <p>
            <span className="profile-label">Email:</span> {user.email}{" "}
            <button className="change-btn">Change</button>
            {!user.isVerified && (
              <button onClick={handleRedirect} className="verify">Verify Email</button>
            )}
          </p>

          <p>
            <span className="profile-label">Mobile:</span>{" "}
            {user.mobile || "Not added"}{" "}
            <button className="change-btn">
              {user.mobile ? "Change" : "Add"}
            </button>
          </p>

          <p>
            <span className="profile-label">Verified:</span>{" "}
            <span className={user.isVerified ? "verified" : "not-verified"}>
              {user.isVerified ? "✅ Yes" : "❌ No"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
