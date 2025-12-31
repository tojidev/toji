"use client";

import Image from "next/image";
import Link from "next/link";

interface WorkItemListCard {
  _id: string;
  workDetailName: string;
  workDetailImage: string;
  workDetailDoubleSection: boolean;
  workDetailDescription: string;
  workItemIdRef: string;
  clientIdRef: string;
  workDetailSlug: string;
}

interface WorkItemCardProps {
  workDetail: WorkItemListCard;
  onEdit?: (client: WorkItemListCard) => void;
  onDelete?: (id: string) => void;
}

const WorkDetailCard: React.FC<WorkItemCardProps> = ({
  workDetail,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white px-4 py-3 mb-3 shadow-sm hover:bg-gray-50">
      <div>
        {/* Name & Description */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 truncate">
            {workDetail.workDetailName}
          </p>
          <p className="text-sm text-gray-500 truncate text-wrap">
            {workDetail.workDetailDescription}
          </p>
        </div>

        {/* Slug */}
        <div className="w-48 text-sm text-gray-500 truncate">
          {workDetail.workDetailSlug}
        </div>
      </div>
      {/* Image */}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={workDetail.workDetailImage}
          alt={workDetail.workDetailName}
          fill
          className="object-cover"
        />
      </div>
      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/admin/clients/${workDetail.clientIdRef}/work-items/${workDetail.workDetailSlug}/work-details`}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          {workDetail.workDetailName}
        </Link>

        <button
          onClick={() => onEdit?.(workDetail)}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(workDetail._id)}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkDetailCard;
