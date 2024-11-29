"use client";
import Head from "next/head";
import Image from "next/image";
import food6 from "../../../../public/images/food6.svg";
import Logo from "../../../../public/images/logo.svg";
import Layout from "../../components/Layout";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/app/components/ConfirmModal";

export default function SignUp() {
  // State untuk menyimpan email, password, username, dan phone
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [handphone, setPhone] = useState("");
  // state untuk menyimpan error
  const [error, setError] = useState(null);
  // State untuk menandakan apakah komponen sudah di-mount
  const [isMounted, setIsMounted] = useState(false);
  // state untuk menandakan apakah modal sudah terbuka
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // State to manage modal message
  const [modalRoute, setModalRoute] = useState(""); // State to manage modal route
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(email, password, username, handphone);
    if (!isMounted) return;

    if (!email || !password || !username || !handphone) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-paw-delta.vercel.app/api/register",
        { email, password, username, handphone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //alert("Registration successful!");
      // Show the success modal
      setModalMessage("Registration Successful!");
      setModalRoute("/auth/login");
      setIsModalOpen(true);
    } catch (err) {
      setModalMessage("Registration Failed: " + err.response.data.errors);
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
        <title>Sign Up</title>
      </Head>
      <Navbar />

      <Image
        src={food6}
        width={200}
        height={200}
        alt="food"
        className="absolute top-0 right-0"
      />

      <main className="flex flex-col items-center justify-center w-full px-6 sm:px-10 py-20 text-center">
        <div className="relative z-10" style={{ marginBottom: "-1.5rem" }}>
          <h1
            className="text-4xl font-bold text-white bg-[#F1D6A9]/75 px-8 py-2 rounded-lg shadow-lg"
            style={{ fontFamily: "Poppins" }}
          >
            SIGN UP
          </h1>
        </div>

        <div className="bg-[#F5682C]/75 rounded-2xl shadow-2xl flex flex-col sm:flex-row w-full sm:w-3/4 max-w-2xl py-10 px-10">
          {/* Logo Section */}
          <div className="w-full sm:w-1/3 p-5 flex justify-center items-center">
            <Image src={Logo} width={200} height={200} alt="Mealify" />
          </div>
          {/* SignUp Section */}
          <div className="w-full sm:w-2/3 p-5">
            <form
              className="flex flex-col items-center"
              onSubmit={handleSignIn}
            >
              {/* Form Fields */}
              {["Email", "Password", "Username", "Phone Number"].map(
                (label, index) => (
                  <div key={index} className="mb-3 w-full sm:w-5/6">
                    <p className="text-[#FFFFF5] text-left font-bold mb-1">
                      {label}
                    </p>
                    <div className="bg-[#FFFFF5] p-1 sm:p-2 flex items-center rounded-md">
                      <input
                        type={label === "Password" ? "password" : "text"}
                        name={label.toLowerCase().replace(" ", "_")}
                        value={
                          label === "Password"
                            ? password
                            : label === "Email"
                            ? email
                            : label === "Username"
                            ? username
                            : handphone
                        }
                        onChange={(e) =>
                          label === "Password"
                            ? setPassword(e.target.value)
                            : label === "Email"
                            ? setEmail(e.target.value)
                            : label === "Username"
                            ? setUsername(e.target.value)
                            : setPhone(e.target.value.toString())
                        }
                        className="bg-[#FFFFF5] outline-none text-sm flex-1 p-1 text-black"
                      />
                    </div>
                  </div>
                )
              )}

              <button
                className="bg-black hover:bg-[#F1D6A9]
                text-[#FFFFF5] font-bold py-2 px-6 mt-4 rounded-lg w-full sm:w-5/6"
                type="submit"
              >
                Register
              </button>
              <div className="flex flex-container align-middle gap-2">
                <p className="flex">Already have an account?</p>
                <div className="flex">
                  <Link legacyBehavior href="/auth/login">
                    <a className="text-[#FFFFF5] text-sm underline">Log In</a>
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
