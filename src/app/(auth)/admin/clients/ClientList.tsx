"use client";
import React, { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import ClientCard from "../../admin-components/clientsWork/ClientCard";
import { ClientType } from "@/utils/workTypes";
import BackButton from "@/components/common/BackButton";
import Modal from "../../admin-components/Modal";
import { DeleteResponse } from "@/utils/types";
import ClientEditForm from "./ClientEditForm";
import { clientInitialValues } from "@/data/static";

const ClientList: React.FC = () => {
  const { get, del, loading } = useAxios();
  const [clients, setClients] = useState<ClientType[]>([]);
  const [formIntialValue, setFormInitialValue] =
    useState<Omit<ClientType, "_id">>(clientInitialValues);
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

  const handleEdit = (client: Omit<ClientType, "_id">) => {
    setFormInitialValue(client);
    setOpen(true);
  };

  const handleDelete = async (slug: string) => {
    const deletedRes = await del<DeleteResponse>(`/works/${slug}`);

    if (deletedRes?.success) {
      setClients((prevClient) =>
        prevClient.filter((client) => client.clientSlug !== slug)
      );
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!clients.length) {
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
                  Slug or Path name
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Controls
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <ClientCard
                key={client._id}
                client={client}
                onEdit={(client) => handleEdit(client)}
                onDelete={(slug) => handleDelete(slug)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <BackButton backLink={`/admin/`} />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="This is My modal for edit form..."
      >
        <ClientEditForm
          initialValues={formIntialValue}
          modalClose={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ClientList;
