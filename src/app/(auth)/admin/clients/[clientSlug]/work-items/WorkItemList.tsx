"use client";
import React, { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import WorkItemCard from "@/app/(auth)/admin-components/clientsWork/WorkItemCard";
import { WorkItemTypes } from "@/utils/workTypes";
import BackButton from "@/components/common/BackButton";

const WorkItemList: React.FC<{ clientId: string }> = ({ clientId }) => {
  const { get, loading } = useAxios();
  const [workItemsData, setSetWorkItemsData] = useState<WorkItemTypes[]>([]);

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

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!workItemsData.length) {
    return <p className="text-center text-gray-500">No clients found</p>;
  }

  return (
    <div>
      {workItemsData.map((workItem) => (
        <WorkItemCard
          key={workItem._id}
          workItem={workItem}
          onEdit={(c) => console.log("Edit", c)}
          onDelete={(id) => console.log("Delete", id)}
        />
      ))}
      <BackButton />
    </div>
  );
};

export default WorkItemList;
