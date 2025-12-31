"use client";
import React, { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import WorkDetailCard from "@/app/(auth)/admin-components/clientsWork/WorkDetailCard";
import { WorkDetail } from "@/utils/workTypes";
import BackButton from "@/components/common/BackButton";

const WorkDetailList: React.FC<{ clientId: string; workItemId: string }> = ({
  clientId,
  workItemId,
}) => {
  const { get, loading } = useAxios();
  const [workDetail, setWorkDetail] = useState<WorkDetail[]>([]);

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

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!workDetail.length) {
    return <p className="text-center text-gray-500">No clients found</p>;
  }

  return (
    <div>
      {workDetail.map((workDetailData) => (
        <WorkDetailCard
          key={workDetailData._id}
          workDetail={workDetailData}
          onEdit={(c) => console.log("Edit", c)}
          onDelete={(id) => console.log("Delete", id)}
        />
      ))}
      <BackButton />
    </div>
  );
};

export default WorkDetailList;
