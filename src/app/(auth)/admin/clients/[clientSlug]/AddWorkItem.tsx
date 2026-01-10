"use client";

import React from "react";
import { FormikHelpers } from "formik";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "react-toastify";
import { WorkItemTypes } from "@/utils/workTypes";
import WorkItemForm from "./WorkItemForm";
import { workItemInitialValues } from "@/data/static";

const AddWorkItem: React.FC<{
  clientId: string;
}> = ({ clientId }) => {
  const { post } = useAxios();

  const handleSubmit = async (
    values: WorkItemTypes,
    { resetForm }: FormikHelpers<WorkItemTypes>
  ) => {
    const addedWork = await post(`/works/${clientId}/work-items`, values);
    console.log(addedWork);
    resetForm();
    toast.success("New client is added!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Work Item
      </h2>

      <WorkItemForm
        initialValues={workItemInitialValues(clientId)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddWorkItem;
