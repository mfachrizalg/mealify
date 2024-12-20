"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Image from "next/image";
import Navbar from "../components/Navbar";
import food1 from "../../../public/images/food1.svg";
import food2 from "../../../public/images/food2.svg";
import food3 from "../../../public/images/food3.svg";
import food4 from "../../../public/images/food4.svg";
import dotted from "../../../public/images/dotted.svg";
import Layout from "../components/Layout";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter(); // Initialize useRouter
  // Check for JWT token in cookies
  useEffect(() => {
    const token = Cookies.get("mealify");
    if (!token) {
      router.push("/landing");
    }
  }, [router]);
  const handleSearch = () => {
    if (query.trim()) {
      // Navigate to /recipe page with the query as a query parameter
      router.push(`/recipe?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="relative flex flex-col items-center justify-center py-20 ">
        {/* Background images */}
        <Image
          src={food1}
          alt="Food"
          className="absolute flex-auto sm:-top-52 md:top-30 -left-10 w-25 h-auto z-0 overflow-hidden"
          priority={true}
          quality={10}
          loading="eager"
        />

        <Image
          src={food2}
          alt="Food"
          className="absolute flex-auto top-30 -right-64 w-25 h-auto z-0 hidden md:block"
          priority={true}
          loading="eager"
          quality={10}
        />

        <Image
          src={food3}
          alt="Food"
          className="absolute top-96 -left-64 w-25 h-auto z-0 overflow-hidden hidden md:block"
          loading="eager"
          priority={true}
          quality={100}
        />

        <Image
          src={food4}
          alt="Food"
          className="absolute flex top-72 -right-64 w-25 h-auto z-0 overflow-hidden"
          loading="eager"
          quality={10}
        />

        {/* Search Box */}
        <div className="absolute top-56 w-full h-full max-w-xl flex items-center z-10">
          <div className="flex items-center w-full bg-white shadow-md rounded-full overflow-hidden">
            {/* Icon Magnifying Glass */}
            <div className="flex items-center justify-center px-3">
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search Your Recipe..."
              className="flex-1 px-2 py-3 focus:outline-none text-black focus:ring-2 focus:ring-orange-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="justify-center items-center px-1">
              {/* Button */}
              <button
                onClick={handleSearch}
                className="bg-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-600 transition"
              >
                Find Recipe
              </button>
            </div>
          </div>
          <div className="absolute -z-10 left-[-72px] top-10 transform -translate-y-1/2 w-48 h-48 bg-[radial-gradient(circle, #E5E7EB 1px, transparent 1px)] bg-[length:10px_10px]">
            <Image src={dotted} alt="dotted image" />
          </div>
          <div className="absolute -z-10 right-[-72px] top-auto -bottom-40 transform -translate-y-1/2 w-48 h-48 bg-[radial-gradient(circle, #E5E7EB 1px, transparent 1px)] bg-[length:10px_10px] scale-x-[-1]">
            <Image src={dotted} alt="dotted image" />
          </div>
        </div>
      </main>
    </Layout>
  );
}
