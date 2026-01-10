"use client";

import Image from "next/image";
import { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            <Image
              src="/images/toji-logo.svg"
              height={50}
              width={100}
              className="h-12 mr-3 sm:h-15"
              alt="www.toji.co.in"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {pathname !== "/" && (
              <Link href="/" className="hover:text-blue-600">
                Work
              </Link>
            )}
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>

          {/* Hamburger */}
          {open ? (
            <button
              onClick={() => setOpen(false)}
              className="md:hidden focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="md:hidden focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <span className="text-lg font-semibold">
            <Image
              src="/images/toji-logo.svg"
              height={50}
              width={100}
              className="h-12 mr-3 sm:h-15"
              alt="www.toji.co.in"
            />
          </span>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4 p-4 text-sm font-medium">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="hover:text-blue-600"
          >
            Work
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="hover:text-blue-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="hover:text-blue-600"
          >
            Contact
          </Link>
        </nav>
      </aside>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default memo(Header);
