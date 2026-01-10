"use client";

import { WorkItemTypes } from "@/utils/workTypes";
import Image from "next/image";
import Link from "next/link";

interface WorkItemCardProps {
  workItem: WorkItemTypes;
  onEdit?: (client: WorkItemTypes) => void;
  onDelete?: (id: string) => void;
}

const WorkItemCard: React.FC<WorkItemCardProps> = ({
  workItem,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <tr className="hover:bg-slate-50">
        <td className="p-4 border-b border-slate-200 py-5">
          <Image
            src={workItem.workItemImage}
            alt={workItem.workItemName}
            width={100}
            height={75}
            className="w-16 h-16 object-cover rounded"
          />
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="block font-semibold text-sm text-slate-800">
            {workItem.workItemName}
          </p>
        </td>

        <td className="p-4 border-b border-slate-200 py-5  whitespace-wrap overflow-hidden text-ellipsis max-w-sm">
          <p className="text-sm text-slate-500 ">
            {workItem.workItemDescription}
          </p>
        </td>

        <td className="p-4 border-b border-slate-200 py-5">
          <p className="text-sm text-slate-500">
            {workItem.clientIdRef} {" >> "}
          </p>
          <p className="block font-semibold text-sm text-slate-800">
            {workItem.workItemSlug}
          </p>
        </td>
        <td className="text-right">
          <Link
            href={`/admin/clients/${workItem.clientIdRef}/${workItem.workItemSlug}/`}
            className="rounded-md bg-blue-600 p-3 m-2 text-sm text-white hover:bg-blue-700 cursor-pointer"
          >
            Show {workItem.workItemName}
          </Link>

          <button
            onClick={() => onEdit?.(workItem)}
            className="rounded-md bg-blue-600 p-3 m-2 text-sm text-white hover:bg-blue-700 cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete?.(workItem.workItemSlug)}
            className="rounded-md bg-red-600 p-3 m-2 text-sm text-white hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default WorkItemCard;
