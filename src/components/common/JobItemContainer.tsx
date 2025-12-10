import React from "react";
import Image from "next/image";
import { WorkItemsProps } from "@/utils/types";
import Link from "next/link";

const JobItemContainer: React.FC<WorkItemsProps> = ({
  name,
  workItems,
  pageLink,
}) => {
  return (
    <div>
      <div className="italic-text text-xl mb-2">{name}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {workItems.map((item, index) => (
          <div key={index}>
            <Link href={`${pageLink}${item.itemName}`}>
              <Image
                src={item.imagePath}
                alt={item.itemName}
                width={100}
                height={50}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="py-3">{item.itemName}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobItemContainer;
