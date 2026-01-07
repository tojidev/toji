"use client";
import React, { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import WorkDetailCard from "@/app/(auth)/admin-components/clientsWork/WorkDetailCard";
import { WorkDetail } from "@/utils/workTypes";
import BackButton from "@/components/common/BackButton";
import { DeleteResponse } from "@/utils/types";
import Modal from "@/app/(auth)/admin-components/Modal";
import { workDetailInitialValue } from "@/data/static";
import EditWorkDetails from "./EditWorkDetails";

const WorkDetailList: React.FC<{ clientId: string; workItemId: string }> = ({
  clientId,
  workItemId,
}) => {
  const { get, del, loading } = useAxios();
  const [workDetail, setWorkDetail] = useState<WorkDetail[]>([]);
  const [formIntialValue, setFormInitialValue] = useState<
    Omit<WorkDetail, "_id">
  >(workDetailInitialValue(clientId, workItemId));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const workData = await get<WorkDetail[]>(
          `/works/${clientId}/work-items/${workItemId}/work-details`
        );
        setWorkDetail(workData);
        console.log("Clients fetched:", workData);
      } catch (error) {
        console.error("Failed to fetch clients", error);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (workDetail: Omit<WorkDetail, "_id">) => {
    setFormInitialValue(workDetail);
    setOpen(true);
  };

  const handleDelete = async (slug: string) => {
    const deletedRes = await del<DeleteResponse>(
      `/works/${clientId}/work-items/${workItemId}/work-details/${slug}`
    );

    if (deletedRes?.success) {
      setWorkDetail((prevWorkItems) =>
        prevWorkItems.filter((workItem) => workItem.workDetailSlug !== slug)
      );
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!workDetail.length) {
    return <p className="text-center text-gray-500">No clients found</p>;
  }

  return (
    <div>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Image
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Name
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Description
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Slug or Path
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500 text-right">
                  Controls
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {workDetail.map((workDetailData) => (
              <WorkDetailCard
                key={workDetailData._id}
                workDetail={workDetailData}
                onEdit={(c) => handleEdit(c)}
                onDelete={(slug) => handleDelete(slug)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <BackButton backLink={`/admin/clients/${clientId}/work-items/`} />
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Edit work detail"
      >
        <EditWorkDetails
          clientId={clientId}
          initialValues={formIntialValue}
          workItemId={workItemId}
          modalClose={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default WorkDetailList;
