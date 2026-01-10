"use client";
import React, { memo } from "react";

import Link from "next/link";

const BackButton: React.FC<{ backLink: string }> = ({ backLink }) => {
  return (
    <div className="mt-5">
      <Link
        href={backLink}
        onClick={() => window.history.back()}
        className="inline-flex items-center cursor-pointer gap-2 rounded-lg border-none border-gray-300 bg-white px-3 py-2 text font-medium text-gray-900 hover:bg-gray-100 transition"
      >
        <svg
          width="37"
          height="21"
          viewBox="0 0 37 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0219 0.710938L1.42188 10.2109M1.42188 10.2109L11.0219 19.7109M1.42188 10.2109H36.4219"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
        Back
      </Link>
    </div>
  );
};

export default memo(BackButton);
