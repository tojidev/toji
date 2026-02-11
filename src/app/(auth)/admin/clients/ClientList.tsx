"use client";

import React, { memo, useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import ClientCard from "../../admin-components/clientsWork/ClientCard";
import { ClientType } from "@/utils/workTypes";
import BackButton from "@/components/common/BackButton";
import Modal from "../../admin-components/Modal";
import { DeleteResponse } from "@/utils/types";
import { clientInitialValues } from "@/data/static";
import EditClient from "./EditClient";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const ClientList: React.FC = () => {
  const { get, put, del, loading } = useAxios();
  const [clients, setClients] = useState<ClientType[]>([]);
  const [formIntialValue, setFormInitialValue] =
    useState<ClientType>(clientInitialValues);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const workData = await get<ClientType[]>("/works");
        setClients(workData);
        console.log("Clients fetched:", workData);
      } catch (error) {
        console.error("Failed to fetch clients", error);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (client: ClientType) => {
    if (!client.haveSingleWorkDetails) {
      client.haveSingleWorkDetails = false;
    }

    setFormInitialValue(client);
    setOpen(true);
  };

  const handleDelete = async (slug: string) => {
    const deletedRes = await del<DeleteResponse>(`/works/${slug}`);

    if (deletedRes?.success) {
      setClients((prevClient) =>
        prevClient.filter((client) => client.clientSlug !== slug),
      );
    }
  };

  // ✅ DRAG END
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = clients.findIndex((c) => c._id === active.id);
    const newIndex = clients.findIndex((c) => c._id === over.id);

    const newItems = arrayMove(clients, oldIndex, newIndex);

    // optimistic UI
    setClients(newItems);

    // save to DB
    const payload = newItems.map((c, index) => ({
      id: c._id,
      position: index,
      clientSlug: c.clientSlug,
    }));

    const reorderItems = { itemName: "clients", payload };

    console.log(reorderItems);

    await put("/works/reorder", reorderItems);
  };

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(pointerSensor, touchSensor, keyboardSensor);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!clients.length) {
    return <p className="text-center text-gray-500">No clients found</p>;
  }

  return (
    <div>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          sensors={sensors}
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
                    Client Name
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Client Description
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
                items={clients.map((c) => c._id!)}
                strategy={verticalListSortingStrategy}
              >
                {clients.map((client) => (
                  <ClientCard
                    key={client._id}
                    client={client}
                    onEdit={(client) => handleEdit(client)}
                    onDelete={(slug) => handleDelete(slug)}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
      </div>
      <BackButton backLink={`/admin/`} />

      <Modal isOpen={open} onClose={() => setOpen(false)} title={`Edit Client`}>
        <EditClient
          initialValues={formIntialValue}
          modalClose={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default memo(ClientList);
