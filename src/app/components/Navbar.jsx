"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Check for JWT token in localStorage

    const token = localStorage.getItem("token");
    console.log(token);
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setDropdownVisible(false);
    setMenuOpen(false); // Close the menu after logout
  };

  return (
    <header className="bg-orange-500 px-8 py-4 z-20 relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-white">Mealify</span>
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="lg:hidden">
          {menuOpen ? (
            <XMarkIcon
              className="w-8 h-8 text-white cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Bars3Icon
              className="w-8 h-8 text-white cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex space-x-8 text-white font-medium">
          <Link href="/recipe" className="hover:underline">
            Resep
          </Link>
          <Link href="/scheduler" className="hover:underline">
            Jadwal
          </Link>
          <Link href="/bookmark" className="hover:underline">
            Bookmark
          </Link>
        </nav>

        {/* User or Sign Up */}
        <div className="hidden lg:flex items-center space-x-2 text-black rounded-full bg-white p-2">
          {isAuthenticated ? (
            <>
              <span
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className="cursor-pointer"
              >
                Jally
              </span>
              <UserCircleIcon
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className="w-8 h-8 rounded-full bg-orange-300 cursor-pointer"
              />
              {dropdownVisible && (
                <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-2">
                  <button
                    onClick={handleLogout}
                    className="text-orange-500 font-medium px-4 py-2 hover:bg-orange-100 rounded w-full text-left"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link legacyBehavior href="/auth/signup">
              <a className="text-orange-500 font-semibold hover:underline">
                Sign Up
              </a>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden mt-4 bg-white rounded-lg shadow-lg p-4 space-y-4">
          <Link
            href="/recipe"
            className="block text-orange-500 font-medium hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Resep
          </Link>
          <Link
            href="/scheduler"
            className="block text-orange-500 font-medium hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Jadwal
          </Link>
          <Link
            href="/bookmark"
            className="block text-orange-500 font-medium hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Bookmark
          </Link>

          {/* Mobile User Menu */}
          {isAuthenticated ? (
            <>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                <span className="text-black font-medium">Jally</span>
                <UserCircleIcon className="w-8 h-8 rounded-full bg-orange-300" />
              </div>
              {dropdownVisible && (
                <div className="mt-2 bg-orange-100 rounded-lg p-2">
                  <button
                    onClick={handleLogout}
                    className="text-orange-500 font-medium hover:underline w-full text-left"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              href="/auth/signup"
              className="block text-orange-500 font-medium hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
