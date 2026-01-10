"use client";

import React from "react";
import { FormikHelpers } from "formik";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "react-toastify";
import WorkDetailForm from "./WorkDetailForm";
import { WorkDetail } from "@/utils/workTypes";
import { workDetailInitialValue } from "@/data/static";

const AddWorkDetails: React.FC<{ clientId: string; workItemId: string }> = ({
  clientId,
  workItemId,
}) => {
  const { post, loading } = useAxios();

  const handleSubmit = async (
    values: WorkDetail,
    { resetForm }: FormikHelpers<WorkDetail>
  ) => {
    console.log("Form Data:", JSON.stringify(values), loading);
    const addedWork = await post(
      `/works/${clientId}/work-items/${workItemId}/work-details`,
      values
    );
    console.log(addedWork);
    resetForm();
    toast.success("New client is added!");
    // return addedWork;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Work Detail
      </h2>
      <WorkDetailForm
        initialValues={workDetailInitialValue(clientId, workItemId)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddWorkDetails;
