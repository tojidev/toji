"use client";

import Image from "next/image";
import Link from "next/link";

interface WorkItemListCard {
  _id: string;
  workItemName: string;
  workItemImage: string;
  workItemDescription: string;
  clientIdRef: string;
  workItemSlug: string;
}

interface WorkItemCardProps {
  workItem: WorkItemListCard;
  onEdit?: (client: WorkItemListCard) => void;
  onDelete?: (id: string) => void;
}

const WorkItemCard: React.FC<WorkItemCardProps> = ({
  workItem,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white px-4 py-3 mb-3 shadow-sm hover:bg-gray-50">
      <div>
        {/* Name & Description */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 truncate text-wrap">
            {workItem.workItemDescription}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {workItem.workItemName}
          </p>
        </div>

        {/* Slug */}
        <div className="w-48 text-sm text-gray-500 truncate">
          {workItem.workItemSlug}
        </div>
      </div>
      {/* Image */}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={workItem.workItemImage}
          alt={workItem.workItemName}
          fill
          className="object-cover"
        />
      </div>
      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/admin/clients/${workItem.clientIdRef}/work-items/${workItem.workItemSlug}/work-details`}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          {workItem.workItemName}
        </Link>

        <button
          onClick={() => onEdit?.(workItem)}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(workItem._id)}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkItemCard;
