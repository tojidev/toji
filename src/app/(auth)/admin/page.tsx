import React from "react";
import LoginPage from "../admin-components/Login";
import { authToken } from "../common/tokens";
import Link from "next/link";

const Admin = async () => {
  const token = await authToken();

  return (
    <>
      <h1 className="text-3xl text-black pb-6">Welcome to Toji Admin</h1>
      {token ? (
        <div>
          <h2 className="mb-4">You are able to access admin section now...</h2>
          <Link
            href="/admin/clients"
            className="bg-blue-500 rounded p-2 text-white inline-block"
          >
            Click here to start with clients page
          </Link>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default Admin;
