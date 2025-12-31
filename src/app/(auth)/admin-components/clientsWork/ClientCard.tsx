"use client";

import Image from "next/image";
import Link from "next/link";

interface Client {
  _id: string;
  clientName: string;
  clientImage: string;
  clientDescriptionText: string;
  clientSlug: string;
}

interface ClientCardProps {
  client: Client;
  onEdit?: (client: Client) => void;
  onDelete?: (id: string) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white px-4 py-3 mb-3 shadow-sm hover:bg-gray-50">
      {/* Image */}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={client.clientImage}
          alt={client.clientName}
          fill
          className="object-cover"
        />
      </div>

      {/* Name & Description */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate">
          {client.clientName}
        </p>
        <p className="text-sm text-gray-500 truncate text-wrap">
          {client.clientDescriptionText}
        </p>
      </div>

      {/* Slug */}
      <div className="w-48 text-sm text-gray-500 truncate">
        {client.clientSlug}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/admin/clients/${client.clientSlug}/work-items/`}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          {client.clientName}
        </Link>

        <button
          onClick={() => onEdit?.(client)}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(client._id)}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
