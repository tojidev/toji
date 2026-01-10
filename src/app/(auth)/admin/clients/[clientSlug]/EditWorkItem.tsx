"use client";

import React from "react";
import { FormikHelpers } from "formik";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "react-toastify";
import { WorkItemTypes } from "@/utils/workTypes";
import WorkItemForm from "./WorkItemForm";

const EditWorkItem: React.FC<{
  clientId: string;
  initialValues: WorkItemTypes;
  modalClose: () => void;
}> = ({ clientId, initialValues, modalClose }) => {
  const { put, loading } = useAxios();

  const handleSubmit = async (
    values: WorkItemTypes,
    { resetForm }: FormikHelpers<WorkItemTypes>
  ) => {
    console.log("Form Data:", JSON.stringify(values), loading);
    const updatedWorkItem = await put(
      `/works/${clientId}/work-items/${initialValues.workItemSlug}`,
      values
    );
    console.log(updatedWorkItem);
    resetForm();
    modalClose();
    toast.success("New client is added!");
    // return addedWork;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Edit Work item
      </h2>

      <WorkItemForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        modalClose={modalClose}
      />
    </div>
  );
};

export default EditWorkItem;
