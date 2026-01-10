"use client";
import React, { memo, useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import WorkItemCard from "@/app/(auth)/admin-components/clientsWork/WorkItemCard";
import { WorkItemTypes } from "@/utils/workTypes";
import BackButton from "@/components/common/BackButton";
import { DeleteResponse } from "@/utils/types";
import Modal from "@/app/(auth)/admin-components/Modal";
import { workItemInitialValues } from "@/data/static";
import EditWorkItem from "./EditWorkItem";

const WorkItemList: React.FC<{ clientId: string }> = ({ clientId }) => {
  const { get, del, loading } = useAxios();
  const [workItemsData, setSetWorkItemsData] = useState<WorkItemTypes[]>([]);
  const [formIntialValue, setFormInitialValue] = useState<WorkItemTypes>(
    workItemInitialValues(clientId)
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const workData = await get<WorkItemTypes[]>(
          `/works/${clientId}/work-items`
        );
        setSetWorkItemsData(workData);
        console.log("Clients fetched:", workData);
      } catch (error) {
        console.error("Failed to fetch clients", error);
      }
    };

    fetchClients();
  }, [clientId]);

  const handleEdit = (client: WorkItemTypes) => {
    setFormInitialValue(client);
    setOpen(true);
  };

  const handleDelete = async (slug: string) => {
    const deletedRes = await del<DeleteResponse>(
      `/works/${clientId}/work-items/${slug}`
    );

    if (deletedRes?.success) {
      setSetWorkItemsData((prevWorkItems) =>
        prevWorkItems.filter((workItem) => workItem.workItemSlug !== slug)
      );
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!workItemsData.length) {
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
            {workItemsData.map((workItem) => (
              <WorkItemCard
                key={workItem._id}
                workItem={workItem}
                onEdit={(c) => handleEdit(c)}
                onDelete={(slug) => handleDelete(slug)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <BackButton backLink={`/admin/clients/`} />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Edit Work Item"
      >
        <EditWorkItem
          clientId={clientId}
          initialValues={formIntialValue}
          modalClose={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default memo(WorkItemList);
