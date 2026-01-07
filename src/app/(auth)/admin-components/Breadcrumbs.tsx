"use client";

import { usePathname, useParams } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const params = useParams();
  const paths = pathname.split("/").filter(Boolean);
  console.log(paths, pathname, params);

  return (
    <nav className="flex text-gray-600 text-sm py-3" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li>
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
        </li>

        {paths.map((segment, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          return (
            <li key={href} className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-400 mx-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>

              {isLast ? (
                <span className="text-gray-400 capitalize">{segment}</span>
              ) : (
                <Link
                  href={href}
                  className="text-gray-700 hover:text-blue-600 capitalize"
                >
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
