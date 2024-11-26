import Head from "next/head";
import Image from "next/image";
import Logo from "../../../../public/images/logo.svg";
import food3 from "../../../../public/images/food3.svg";
import Layout from "../../components/Layout";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Sign In</title>
      </Head>
      <Navbar />

      {/* Background Decoration */}
      <Image
        src={food3}
        width={200}
        height={200}
        alt="food"
        className="absolute bottom-0 left-0"
      />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center w-full px-4 sm:px-8 py-28">
        {/* Title */}
        <div className="relative z-10 mb-6">
          <h1
            className="text-3xl sm:text-4xl font-bold text-white bg-[#F1D6A9]/75 px-6 py-2 rounded-lg shadow-lg"
            style={{ fontFamily: "Poppins" }}
          >
            SIGN IN
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-[#F5682C]/75 rounded-2xl shadow-2xl flex flex-col sm:flex-row w-full sm:w-4/5 lg:w-2/3 max-w-4xl py-10 px-6 sm:px-12 gap-6">
          {/* Logo Section */}
          <div className="flex justify-center items-center sm:w-1/3">
            <Image src={Logo} width={150} height={150} alt="Mealify Logo" />
          </div>

          {/* Form Section */}
          <div className="w-full sm:w-2/3 flex flex-col">
            {/* Form Fields */}
            {["Email", "Password"].map((label, index) => (
              <div key={index} className="mb-4 w-full">
                <label
                  className="text-white font-bold text-left block mb-1"
                  htmlFor={label.toLowerCase()}
                >
                  {label}
                </label>
                <div className="bg-[#FFFFF5] p-2 rounded-md">
                  <input
                    type={label === "Password" ? "password" : "text"}
                    name={label.toLowerCase()}
                    id={label.toLowerCase()}
                    className="bg-transparent outline-none w-full text-black p-1"
                    placeholder={`Enter your ${label}`}
                  />
                </div>
              </div>
            ))}

            {/* Forgot Password Link */}
            <Link legacyBehavior href="/auth/forgot-password">
              <a className="text-[#FFFFF5] text-sm underline mb-4 self-end">
                Forgot Password?
              </a>
            </Link>

            {/* Login Button */}
            <button
              className="bg-black hover:bg-[#F1D6A9] text-[#FFFFF5] font-bold py-2 px-6 mt-4 rounded-lg w-full"
              type="submit"
            >
              Login
            </button>

            {/* Sign Up Link */}
            <div className="flex justify-center items-center mt-4">
              <p className="text-sm text-white mr-2">Don't have an account?</p>
              <Link legacyBehavior href="/auth/signup">
                <a className="text-sm text-[#FFFFF5] underline">Sign Up</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
