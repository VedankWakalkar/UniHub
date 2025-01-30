"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className={`text-xl font-bold ${
              isScrolled ? "text-blue-600" : "text-white"
            }`}>
              CampusServices
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services/printing" className={`${
              isScrolled ? "text-gray-600" : "text-white"
            } hover:text-blue-500 transition-colors`}>
              Printing
            </Link>
            <Link href="/services/canteen" className={`${
              isScrolled ? "text-gray-600" : "text-white"
            } hover:text-blue-500 transition-colors`}>
              Canteen
            </Link>
            <Link href="/about" className={`${
              isScrolled ? "text-gray-600" : "text-white"
            } hover:text-blue-500 transition-colors`}>
              About
            </Link>
            <Link href="/contact" className={`${
              isScrolled ? "text-gray-600" : "text-white"
            } hover:text-blue-500 transition-colors`}>
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant={isScrolled ? "default" : "outline"} className={
              isScrolled ? "" : "text-white border-white hover:bg-white/10"
            }>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}