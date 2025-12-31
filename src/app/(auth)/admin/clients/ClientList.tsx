"use client";
import React, { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import ClientCard from "../../admin-components/clientsWork/ClientCard";
import { ClientType } from "@/utils/workTypes";
import BackButton from "@/components/common/BackButton";

const ClientList: React.FC = () => {
  const { get, loading } = useAxios();
  const [clients, setClients] = useState<ClientType[]>([]);

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

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!clients.length) {
    return <p className="text-center text-gray-500">No clients found</p>;
  }

  return (
    <div>
      {clients.map((client) => (
        <ClientCard
          key={client._id}
          client={client}
          onEdit={(c) => console.log("Edit", c)}
          onDelete={(id) => console.log("Delete", id)}
        />
      ))}
      <BackButton />
    </div>
  );
};

export default ClientList;
