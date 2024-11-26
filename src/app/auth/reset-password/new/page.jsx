"use client";
import React, { useState } from "react";
import Image from "next/image";
import { PasswordCard } from "../../../components/PasswordCard";

export default function NewPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State untuk modal

  async function handleNewPassword(e) {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validasi password
    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setShowModal(true);
      return;
    }

    if (!/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setMessage(
        "Password must include at least one uppercase letter and one number."
      );
      setShowModal(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setShowModal(true);
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/new-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password.");
      }

      // Jika sukses, tampilkan pesan sukses
      setMessage("Password successfully reset. You can now log in.");
      setShowModal(true);
    } catch (error) {
      // Jika gagal, tampilkan pesan error
      setMessage("Something went wrong. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false); // Selesai loading
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-orange-300 via-orange-400 to-orange-200 flex items-center justify-center p-4 overflow-hidden">
      {/* Card */}
      <div className="relative z-10">
        <PasswordCard
          title="Reset Password"
          fields={[
            {
              label: "New Password",
              type: "password",
              placeholder: "Enter new password",
              name: "newPassword",
            },
            {
              label: "Repeat Your New Password",
              type: "password",
              placeholder: "Repeat new password",
              name: "confirmPassword",
            },
          ]}
          buttonText={loading ? "Updating..." : "Done"}
          onSubmit={handleNewPassword}
        />
      </div>

      {/* Decorative Images */}
      <Image
        src="/images/food10.svg"
        alt="Food Illustration"
        className="absolute"
        style={{
          top: "0",
          right: "0",
          transform: "translate(50%, -50%)",
          zIndex: 5,
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded shadow-md w-[90%] sm:w-[80%] md:w-[70%] max-w-md text-center">
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
  );
}
