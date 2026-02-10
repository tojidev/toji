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
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const WorkItemList: React.FC<{ clientId: string }> = ({ clientId }) => {
  const { get, del, put, loading } = useAxios();
  const [workItemsData, setSetWorkItemsData] = useState<WorkItemTypes[]>([]);
  const [formIntialValue, setFormInitialValue] = useState<WorkItemTypes>(
    workItemInitialValues(clientId),
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const workData = await get<WorkItemTypes[]>(
          `/works/${clientId}/work-items`,
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
      `/works/${clientId}/work-items/${slug}`,
    );

    if (deletedRes?.success) {
      setSetWorkItemsData((prevWorkItems) =>
        prevWorkItems.filter((workItem) => workItem.workItemSlug !== slug),
      );
    }
  };

  // ✅ DRAG END
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = workItemsData.findIndex((c) => c._id === active.id);
    const newIndex = workItemsData.findIndex((c) => c._id === over.id);

    const newItems = arrayMove(workItemsData, oldIndex, newIndex);

    // optimistic UI
    setSetWorkItemsData(newItems);

    // save to DB
    const payload = newItems.map((c, index) => ({
      id: c._id,
      position: index,
      workItemSlug: c.workItemSlug,
    }));

    const reorderItems = { itemName: "workItems", payload };

    console.log(reorderItems);

    await put("/works/reorder", reorderItems);
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
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
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
              <SortableContext
                items={workItemsData.map((c) => c._id!)}
                strategy={verticalListSortingStrategy}
              >
                {workItemsData.map((workItem) => (
                  <WorkItemCard
                    key={workItem._id}
                    workItem={workItem}
                    onEdit={(c) => handleEdit(c)}
                    onDelete={(slug) => handleDelete(slug)}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
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
