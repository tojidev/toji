"use client";

import React, { memo } from "react";
import { FormikHelpers } from "formik";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "react-toastify";
import { ClientType } from "@/utils/workTypes";
import ClientForm from "./ClientForm";
import { clientInitialValues } from "@/data/static";

const AddClient: React.FC = () => {
  const { post, loading } = useAxios();

  const handleSubmit = async (
    values: ClientType,
    { resetForm }: FormikHelpers<ClientType>
  ) => {
    console.log("Form Data:", JSON.stringify(values), loading);
    const addedWork = await post("/works", values);
    console.log(addedWork);
    resetForm();
    toast.success("New client is added!");
    // return addedWork;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create Client
      </h2>

      <ClientForm initialValues={clientInitialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default memo(AddClient);
