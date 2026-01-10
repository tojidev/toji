"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { LogoutButton } from "./Logout";

const AdminHeader: React.FC<{ token: string }> = ({ token }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="hidden sm:flex w-full items-center bg-gray-100 py-2 px-6 relative">
      {/* Left spacer */}
      <div className="w-1/2" />

      {/* Right section */}
      <div className="w-1/2 flex justify-end relative">
        {/* Avatar Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:outline-none"
        >
          <Image
            src="/images/logo.png"
            alt="Admin Avatar"
            width={48}
            height={48}
            className="object-cover"
          />
        </button>
        {token && <LogoutButton />}
        {/* Overlay */}
        {/* {isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 h-full w-full cursor-default"
          />
        )} */}
        {/* Dropdown */}
        {/* {isOpen && (
          <div className="absolute right-0 mt-16 w-32 bg-white rounded-lg shadow-lg py-2 z-20">
            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
              Account
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
              Support
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Sign Out
            </a>
          </div>
        )} */}
      </div>
    </header>
  );
};

export default memo(AdminHeader);
