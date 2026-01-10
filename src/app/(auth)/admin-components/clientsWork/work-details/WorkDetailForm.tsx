"use client";

import React, { memo } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import ImageUpload from "@/components/common/ImageUpload";
import { WorkDetail } from "@/utils/workTypes";
import Image from "next/image";

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

const WorkDetailForm: React.FC<{
  initialValues: WorkDetail;
  onSubmit: (
    values: WorkDetail,
    formikHelpers: FormikHelpers<WorkDetail>
  ) => Promise<void>;
  modalClose?: () => void;
}> = ({ initialValues, onSubmit, modalClose }) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={workItemSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
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
                    <Image
                      src={values.workDetailImage}
                      alt="Preview"
                      width={50}
                      height={40}
                      className="h-10 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Checkbox */}
            <div className="p-4 border border-black relative mt-12">
              <h2 className="absolute -top-6 translate-y-1/2 bg-white">
                Two section view for work detail
              </h2>
              <label className="flex items-center gap-2">
                <Field
                  type="checkbox"
                  name="workDetailDoubleSection"
                  className="h-4 w-4"
                />
                <span className="text-sm">Enable double view in a row</span>
              </label>

              <div>
                <div className="flex">
                  <div className="flex-1">
                    <Field
                      name={`workDetailDescription`}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      disabled={true}
                    />
                    <ErrorMessage
                      name={`workDetailDescription`}
                      component="p"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                  <div className="mt-1">
                    <ImageUpload
                      onSuccess={(url) =>
                        setFieldValue(`workDetailDescription`, url)
                      }
                    />
                  </div>

                  {/* Preview */}
                  {values.workDetailDescription && (
                    <div className="mt-1">
                      <Image
                        src={values.workDetailDescription}
                        alt="Preview"
                        width={50}
                        height={40}
                        className="h-10 rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
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

            {modalClose ? (
              <button
                type="button"
                onClick={modalClose}
                className="p-3 ml-4 cursor-pointer bg-red-800 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                Close
              </button>
            ) : (
              <button
                type="reset"
                className="p-3 ml-4 cursor-pointer bg-red-800 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {"Clear"}
              </button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default memo(WorkDetailForm);
