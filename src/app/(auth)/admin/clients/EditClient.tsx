"use client";

import React from "react";
import { FormikHelpers } from "formik";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "react-toastify";
import { ClientType } from "@/utils/workTypes";
import ClientForm from "./ClientForm";

const EditClient: React.FC<{
  initialValues: ClientType;
  modalClose: () => void;
}> = ({ initialValues, modalClose }) => {
  const { put, loading } = useAxios();

  const handleSubmit = async (
    values: ClientType,
    { resetForm }: FormikHelpers<ClientType>
  ) => {
    console.log("Form Data:", JSON.stringify(values), loading);
    const addedWork = await put(`/works/${initialValues.clientSlug}`, values);
    console.log(addedWork);
    resetForm();
    modalClose();
    toast.success("New client is added!");
    // return addedWork;
  };

  console.log(initialValues);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <ClientForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        modalClose={modalClose}
      />
    </div>
  );
};

export default EditClient;
