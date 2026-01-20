import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ClientType } from "@/utils/workTypes";

const ContentItemContainer: React.FC<{
  pageName: string;
  clients: ClientType[];
  pageLink: string;
}> = ({ pageName, clients, pageLink }) => {
  return (
    <div>
      <div className="italic-text text-xl mb-2">{pageName}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {clients.map((item, index) => (
          <div key={index}>
            <Link href={`${pageLink}${item.clientSlug}`}>
              <Image
                src={item.clientImage}
                alt={item.clientName}
                width={1000}
                height={640}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="py-3 font-semibold">{item.clientName}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentItemContainer;
