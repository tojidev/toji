"use client";

import React, { memo } from "react";
import { FormikHelpers } from "formik";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "react-toastify";
import { WorkDetail } from "@/utils/workTypes";
import WorkDetailForm from "./WorkDetailForm";

const EditWorkDetails: React.FC<{
  clientId: string;
  workItemId: string;
  initialValues: WorkDetail;
  modalClose: () => void;
}> = ({ clientId, workItemId, initialValues, modalClose }) => {
  const { put, loading } = useAxios();

  const handleSubmit = async (
    values: WorkDetail,
    { resetForm }: FormikHelpers<WorkDetail>
  ) => {
    console.log("Form Data:", JSON.stringify(values), loading);
    const updatedWorkDetail = await put(
      `/works/${clientId}/work-items/${workItemId}/work-details/${initialValues.workDetailSlug}`,
      values
    );
    console.log(updatedWorkDetail);
    resetForm();
    modalClose();
    toast.success("New client is added!");
    // return addedWork;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <WorkDetailForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        modalClose={modalClose}
      />
    </div>
  );
};

export default memo(EditWorkDetails);
