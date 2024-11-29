"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import Logo from "../../../../public/images/logo.svg";
import food3 from "../../../../public/images/food3.svg";
import Layout from "../../components/Layout";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import ConfirmModal from "@/app/components/ConfirmModal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // State untuk menyimpan email dan password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State untuk menyimpan error
  const [error, setError] = useState(null);
  // State untuk menandakan apakah komponen sudah di-mount
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State to manage modal message
  const [modalRoute, setModalRoute] = useState(""); // State to manage modal route
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    // Check for JWT token in cookies
    const token = Cookies.get("token");
    if (token) {
      router.push("/landing");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isMounted) return;

    try {
      const response = await axios.post(
        "https://backend-paw-delta.vercel.app/api/login",
        { email, password }
        // {
        //   withCredentials: true,
        // }
      );

      if (response.status === 200) {
        const token = response.data.token;
        console.log("Response:", response);
        console.log("Token:", token);
        //Simpan JWT token di cookie
        Cookies.set("mealify", token, {
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        });
        // Simpan token JWT di localStorage
        //localStorage.setItem("token", token);

        // Show the success modal
        setModalMessage("Login Successful!");
        setModalRoute("/home");
        setIsModalOpen(true);
      }
    } catch (err) {
      // console.error("Error during login:", err);
      // setError(err.response?.data?.message || "Failed to login.");
      setModalMessage("Login Failed: " + err);
      setModalRoute("#");
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    setIsModalOpen(false);
    router.push(modalRoute);
  };

  return (
    <Layout>
      <Head>
        <title>Sign In</title>
      </Head>
      <Navbar />
      <Image
        src={food3}
        width={200}
        height={200}
        alt="food"
        className="absolute bottom-0 left-0"
      />

      <main className="flex flex-col items-center justify-center w-full px-6 sm:px-10 py-28 text-center">
        <div className="relative z-10" style={{ marginBottom: "-1.5rem" }}>
          <h1
            className="text-4xl font-bold text-white bg-[#F1D6A9]/75 px-8 py-2 rounded-lg shadow-lg"
            style={{ fontFamily: "Poppins" }}
          >
            SIGN IN
          </h1>
        </div>

        <div className="bg-[#F5682C]/75 rounded-2xl shadow-2xl flex flex-col sm:flex-row w-full sm:w-3/4 max-w-2xl py-10 px-10">
          {/* Logo Section */}
          <div className="w-full sm:w-1/3 p-5 flex justify-center items-center">
            <Image src={Logo} width={200} height={200} alt="Mealify" />
          </div>

          {/* Login Section */}
          <div className="w-full sm:w-2/3 p-5">
            <form onSubmit={handleLogin} className="flex flex-col items-center">
              {["Email", "Password"].map((label, index) => (
                <div key={index} className="mb-3 w-full sm:w-5/6">
                  <p className="text-[#FFFFF5] text-left font-bold mb-1">
                    {label}
                  </p>
                  <div className="bg-[#FFFFF5] p-1 sm:p-2 flex items-center rounded-md">
                    <input
                      type={label === "Password" ? "password" : "email"}
                      name={label.toLowerCase()}
                      value={label === "Password" ? password : email}
                      onChange={(e) =>
                        label === "Password"
                          ? setPassword(e.target.value)
                          : setEmail(e.target.value)
                      }
                      className="bg-[#FFFFF5] outline-none text-sm flex-1 p-1 text-black"
                      required
                    />
                  </div>
                </div>
              ))}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <Link legacyBehavior href="/auth/signup">
                <a className="text-[#FFFFF5] text-sm underline mt-2">
                  Forgot Password?
                </a>
              </Link>
              <button
                className="bg-black hover:bg-[#F1D6A9] text-[#FFFFF5] font-bold py-2 px-6 mt-4 rounded-lg w-full sm:w-5/6"
                type="submit"
              >
                Login
              </button>
              <div className="flex flex-container align-middle gap-2 mt-4">
                <p className="flex">Doesn't have an account?</p>
                <div className="flex">
                  <Link legacyBehavior href="/auth/signup">
                    <a className="text-[#FFFFF5] text-sm underline">Sign Up</a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        message={modalMessage}
        route={modalRoute}
      />
    </Layout>
  );
}
