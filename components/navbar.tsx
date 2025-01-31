"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isStudentLogged, setIsStudentLogged] = useState(false);

  useEffect(() => {
    // Set scroll state for nav behavior
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Fetch the login status from localStorage on client-side
    const checkLoginStatus = () => {
      setIsStudentLogged(localStorage.getItem("isStudentLogged") === "true");
    };

    window.addEventListener("scroll", handleScroll);
    checkLoginStatus();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isStudentLogged");
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 bg-blue-600 border-black ${
        isScrolled ? "shadow-2xl rounded-xl" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span
              className={`text-xl font-bold ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              CampusServices
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/services/printing"
              className={`${
                isScrolled ? "text-black font-semibold" : "text-white"
              } text-black hover:text-black transition-colors`}
            >
              Printing
            </Link>
            <Link
              href="/services/canteen"
              className={`${
                isScrolled ? "text-black font-semibold" : "text-white"
              } hover:text-black transition-colors`}
            >
              Canteen
            </Link>
            <Link
              href="/services/about"
              className={`${
                isScrolled ? "text-black font-semibold" : "text-white"
              } hover:text-black transition-colors`}
            >
              About
            </Link>
            <Link
              href="/services/contact"
              className={`${
                isScrolled ? "text-black font-semibold" : "text-white"
              } hover:text-black transition-colors`}
            >
              Contact
            </Link>
            <Link
              href="/services/lost"
              className={`${
                isScrolled ? "text-black font-semibold" : "text-white"
              } hover:text-black transition-colors`}
            >
              Lost and Found
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isStudentLogged ? (
              <Button
                variant={isScrolled ? "default" : "outline"}
                className="hover:text-blue-500 font-semibold"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Link href="/auth/signin">
                <Button
                  variant={isScrolled ? "default" : "outline"}
                  className="hover:text-blue-500 font-semibold"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
