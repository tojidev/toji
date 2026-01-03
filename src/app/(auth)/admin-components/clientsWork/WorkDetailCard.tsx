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
    <tr className="hover:bg-slate-50">
      <td className="p-4 border-b border-slate-200 py-5">
        <Image
          src={workDetail.workDetailImage}
          alt={workDetail.workDetailName}
          width={100}
          height={75}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td className="p-4 border-b border-slate-200 py-5">
        <p className="block font-semibold text-sm text-slate-800">
          {workDetail.workDetailName}
        </p>
      </td>

      <td className="p-4 border-b border-slate-200 py-5  whitespace-wrap overflow-hidden text-ellipsis max-w-sm">
        <h3>Double Section = {workDetail.workDetailDoubleSection}</h3>
        <p className="text-sm text-slate-500 ">
          {workDetail.workDetailDescription}
        </p>
      </td>

      <td className="p-4 border-b border-slate-200 py-5">
        <p className="text-sm text-slate-500">
          {workDetail.clientIdRef} {" >> "}
        </p>
        <p className="text-sm text-slate-500">
          {workDetail.workItemIdRef} {" >> "}
        </p>
        <p className="block font-semibold text-sm text-slate-800">
          {workDetail.workDetailSlug}
        </p>
      </td>
      <td className="text-right">
        <Link
          href={`/admin/clients/${workDetail.clientIdRef}/work-items/${workDetail.workDetailSlug}/work-details`}
          className="rounded-md bg-blue-600 p-3 m-2 text-sm text-white hover:bg-blue-700"
        >
          {workDetail.workDetailName}
        </Link>

        <button
          onClick={() => onEdit?.(workDetail)}
          className="rounded-md bg-blue-600 p-3 m-2 text-sm text-white hover:bg-blue-700 cursor-pointer"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(workDetail.workDetailSlug)}
          className="rounded-md bg-red-600 p-3 m-2 text-sm text-white hover:bg-red-700 cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default WorkDetailCard;
