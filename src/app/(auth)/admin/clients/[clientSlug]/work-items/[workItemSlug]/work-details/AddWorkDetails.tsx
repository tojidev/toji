"use client";

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "react-toastify";
import ImageUpload from "@/components/common/ImageUpload";
import { AddWorkDetailFormValues } from "@/utils/types";
import TipTapEditor from "@/components/common/TiptapEditor";

const workItemSchema = Yup.object({
  workDetailName: Yup.string().required("Required"),
  workDetailImage: Yup.string().url("Invalid image URL").required("Required"),
  workDetailDescription: Yup.string(),
  workDetailDoubleSection: Yup.boolean(),
  clientIdRef: Yup.string().nullable(),
  workItemIdRef: Yup.string().nullable(),
  workDetailSlug: Yup.string()
    .matches(/^[a-z0-9-]+$/, "Slug must be lowercase & hyphen-separated")
    .required("Slug is required"),
});

/* -----------------------------
   Initial Values
------------------------------ */
function formInitialValue(clientName: string, workItemName: string) {
  const initialValues: AddWorkDetailFormValues = {
    workDetailName: "",
    workDetailImage: "",
    workDetailDoubleSection: false,
    workDetailDescription: "",
    clientIdRef: clientName,
    workItemIdRef: workItemName,
    workDetailSlug: "",
  };
  return initialValues;
}
/* -----------------------------
   Component
------------------------------ */
const AddWorkDetails: React.FC<{ clientId: string; workItemId: string }> = ({
  clientId,
  workItemId,
}) => {
  const { post, loading } = useAxios();

  // useEffect(() => {
  //   initialValues.clientIdRef = clientId;
  //   initialValues.workItemIdRef = workItemId;
  // }, [clientId, workItemId]);

  const handleSubmit = async (
    values: AddWorkDetailFormValues,
    { resetForm }: FormikHelpers<AddWorkDetailFormValues>
  ) => {
    console.log("Form Data:", JSON.stringify(values), loading);
    const addedWork = await post(
      `/works/${clientId}/work-items/${workItemId}/work-details`,
      values
    );
    resetForm();
    toast.success("New client is added!");
    return addedWork;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Work item
      </h2>

      <Formik
        initialValues={formInitialValue(clientId, workItemId)}
        validationSchema={workItemSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work detail name
              </label>
              <Field
                name="workDetailName"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="workDetailName"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Detail image
              </label>
              <div className="flex">
                <div className="flex-1">
                  <Field
                    name={`workDetailImage`}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={true}
                  />
                  <ErrorMessage
                    name={`workDetailImage`}
                    component="p"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
                <div className="mt-1">
                  <ImageUpload
                    onSuccess={(url) => setFieldValue(`workDetailImage`, url)}
                  />
                </div>

                {/* Preview */}
                {values.workDetailImage && (
                  <div className="mt-1">
                    <img
                      src={values.workDetailImage}
                      alt="Preview"
                      className="h-10 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Checkbox */}
            <div className="p-4 border border-black relative mt-12">
              <h2 className="absolute -top-6 translate-y-1/2 bg-white">
                For Work Details two section view
              </h2>
              <label className="flex items-center gap-2">
                <Field
                  type="checkbox"
                  name="workDetailDoubleSection"
                  className="h-4 w-4"
                />
                <span className="text-sm">Enable extra field</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Creatives work description
                </label>
                <TipTapEditor
                  value={values.workDetailDescription}
                  onChange={(val) =>
                    setFieldValue("workDetailDescription", val)
                  }
                  error={errors.workDetailDescription}
                  touched={touched.workDetailDescription}
                />
                {/* <Field
                as="textarea"
                name="workItemDescription"
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="workItemDescription"
                component="p"
                className="text-sm text-red-500 mt-1"
              /> */}
              </div>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work item access path name
              </label>
              <Field
                name="workDetailSlug"
                placeholder="Work item access path name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="workDetailSlug"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <Field type="hidden" name="workItemIdRef" />
            <Field type="hidden" name="clientIdRef" />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="p-3 cursor-pointer bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Save Client"}
            </button>
            <button
              type="button"
              disabled={false}
              className="p-3 ml-4 cursor-pointer bg-red-800 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {"Clear"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddWorkDetails;
