"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "react-toastify";
import ImageUpload from "@/components/common/ImageUpload";
import TipTapEditor from "@/components/common/TiptapEditor";
import { ClientType } from "@/utils/workTypes";

/* -----------------------------
   Validation Schema
------------------------------ */
const ClientSchema = Yup.object({
  haveSingleWorkDetails: Yup.boolean(),
  clientName: Yup.string()
    .min(2, "Too short")
    .required("Client name is required"),

  clientImage: Yup.string()
    .url("Must be a valid URL")
    .required("Client image is required"),

  clientDescriptionText: Yup.string()
    .min(10, "Minimum 10 characters")
    .required("Description is required"),

  clientSlug: Yup.string()
    .matches(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen-separated")
    .required("Slug is required"),
});

const ClientEditForm: React.FC<{
  initialValues: Omit<ClientType, "_id">;
  modalClose: () => void;
}> = ({ initialValues, modalClose }) => {
  const { put, loading } = useAxios();

  const handleSubmit = async (
    values: Omit<ClientType, "_id">,
    { resetForm }: FormikHelpers<Omit<ClientType, "_id">>
  ) => {
    console.log("Form Data:", JSON.stringify(values), loading);
    const addedWork = await put(`/works/${initialValues.clientSlug}`, values);
    resetForm();
    modalClose();
    toast.success("New client is added!");
    return addedWork;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      {/* <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create Client
      </h2> */}

      <Formik
        initialValues={initialValues}
        validationSchema={ClientSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values, errors, touched }) => (
          <Form className="space-y-4">
            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <Field
                  name="haveSingleWorkDetails"
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm">
                  Have single work item details only?
                </span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Name
              </label>
              <Field
                name="clientName"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="clientName"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Client Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Image URL
              </label>
              <div className="flex">
                <div className="flex-1">
                  <Field
                    name="clientImage"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={true}
                  />
                </div>
                <div className="mt-1">
                  <ImageUpload
                    onSuccess={(url) => setFieldValue("clientImage", url)}
                  />
                </div>

                {/* Preview */}
                {values.clientImage && (
                  <div className="mt-1">
                    <img
                      src={values.clientImage}
                      alt="Preview"
                      className="h-10 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              <ErrorMessage
                name="clientImage"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {"Description (for left side)"}
              </label>
              <TipTapEditor
                value={values.clientDescriptionText}
                onChange={(val) => setFieldValue("clientDescriptionText", val)}
                error={errors.clientDescriptionText}
                touched={touched.clientDescriptionText}
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Slug
              </label>
              <Field
                name="clientSlug"
                placeholder="example-client-name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="clientSlug"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

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

export default ClientEditForm;
