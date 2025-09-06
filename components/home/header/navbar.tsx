"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui/button";
import SearchInput from "./search-input";
import { ToggleMode } from "./toggle-mode";
import { Menu, X } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-yellow-500/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Left Section - Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/new-logo2-removebg-preview.png"
                  alt="The Diary Logo"
                  width={100}
                  height={60}
                  className="h-auto w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-8">
              {["Articles", "Tutorials", "About", "Dashboard"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-medium text-muted-foreground hover:text-yellow-500 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Right Section - Desktop & Tablet */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="hidden lg:block">
                <SearchInput />
              </div>
              <ToggleMode />

              <SignedIn>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <div className="flex gap-2">
                  <SignInButton mode="modal">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:text-yellow-500 hover:bg-yellow-500/10 transition"
                    >
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:opacity-90 transition"
                    >
                      Signup
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:hidden">
              <ToggleMode />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2 hover:text-yellow-500 transition"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="sm:hidden pb-3">
            <SearchInput />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-64 bg-background border-l border-yellow-500/40 shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-yellow-500/40">
                <h2 className="text-lg font-semibold text-yellow-500">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeMobileMenu}
                  className="p-2 hover:text-yellow-500"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-20">
                <div className="space-y-1 px-4">
                  {["Articles", "Tutorials", "About", "Dashboard"].map(
                    (item) => (
                      <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {item}
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="p-4 border-t border-yellow-500/40 space-y-3">
                <SignInButton mode="modal">
                  <Button
                    className="w-full hover:text-yellow-500 hover:bg-yellow-500/10 transition"
                    variant="outline"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:opacity-90 transition"
                    onClick={closeMobileMenu}
                  >
                    Signup
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
