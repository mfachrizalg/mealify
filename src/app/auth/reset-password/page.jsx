"use client";
import React, { useState } from "react";
import Image from "next/image"; // Import Next.js Image Component
import { PasswordCard } from "../../components/PasswordCard";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  async function handleResetPassword(e) {
    e.preventDefault();
    const email = e.target.email.value;

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      setShowModal(true);
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset email.");
      }

      setMessage("If the email is registered, a reset link will be sent.");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  }

  return (
    <Layout>
      <Navbar />
      <div className="relative min-h-screen w-full bg-gradient-to-b from-orange-300 via-orange-400 to-orange-200 flex items-center justify-center p-4 overflow-hidden">
        <div className="relative z-10">
          <PasswordCard
            title="Reset Password"
            fields={[
              {
                label: "Email",
                type: "email",
                placeholder: "Enter your email",
                name: "email",
              },
            ]}
            buttonText={loading ? "Sending..." : "Send Verification Email"}
            onSubmit={handleResetPassword}
          />
        </div>

        <Image
          src="/images/food10.svg"
          alt="Food Illustration"
          className="absolute"
          style={{
            top: "0",
            right: "0",
            transform: "translate(50%, -50%)",
            zIndex: "5",
          }}
          width={400}
          height={400}
        />

        <Image
          src="/images/dotted.svg"
          alt="Decorative Dots"
          className="absolute top-10 left-10"
          width={100}
          height={100}
        />

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96 text-center">
              <p className="text-md text-gray-700">{message}</p>
              <button
                className="mt-4 bg-orange-500 text-white py-1 px-4 rounded hover:bg-orange-600"
                onClick={() => setShowModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
