"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";

export default memo(function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy auth check
    if (username === "toji_user" && password === "Toji@2026") {
      // Set cookie (client-side)
      document.cookie = `auth_token=toji-token; path=/`;

      router.push("/admin"); // redirect after login
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>

        {error && (
          <p className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
});
