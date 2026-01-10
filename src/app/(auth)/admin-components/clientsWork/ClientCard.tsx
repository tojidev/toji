"use client";

import Image from "next/image";
import Link from "next/link";
import { ClientType } from "@/utils/workTypes";

interface ClientCardProps {
  client: ClientType;
  onEdit?: (client: ClientType) => void;
  onDelete?: (id: string) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <tr className="hover:bg-slate-50">
        <td className="p-4 border-b border-slate-200 py-5">
          <Image
            src={client.clientImage}
            alt={client.clientName}
            width={100}
            height={75}
            className="w-16 h-16 object-cover rounded"
          />
        </td>
        <td className="p-4 border-b border-slate-200 py-5">
          <p className="block font-semibold text-sm text-slate-800">
            {client.clientName}
          </p>
        </td>

        <td className="p-4 border-b border-slate-200 py-5 whitespace-wrap overflow-hidden text-ellipsis max-w-xs max-h-xs">
          <p className="text-sm text-slate-500 ">
            {client.clientDescriptionText}
          </p>
        </td>

        <td className="p-4 border-b border-slate-200 py-5">
          <p
            className={`text-sm text-slate-800 ${
              client.haveSingleWorkDetails && "font-semibold"
            }`}
          >
            Direct detail page - {client.haveSingleWorkDetails ? "Yes" : "No"}
          </p>
          <p className="text-sm text-slate-500">{client.clientSlug}</p>
        </td>
        <td className="text-right">
          <Link
            href={`/admin/clients/${client.clientSlug}/`}
            className="rounded-md bg-blue-600 p-3 mr-2 text-sm leading-tight text-white hover:bg-blue-700 cursor-pointer"
          >
            Show
          </Link>

          <button
            onClick={() => onEdit?.(client)}
            className="rounded-md bg-blue-600 p-3 mr-2 text-sm leading-tight text-white hover:bg-blue-700 cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete?.(client.clientSlug)}
            className="rounded-md bg-red-600 p-3 mr-2 text-sm leading-tight text-white hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default ClientCard;
