import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WorkItemTypes } from "@/utils/workTypes";
import BackButton from "./BackButton";

const JobItemContainer: React.FC<{
  workItems: WorkItemTypes[];
  pageLink: string;
}> = ({ workItems, pageLink }) => {
  return (
    <div>
      {/* <div className="italic-text text-xl mb-2">{"Name"}</div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {workItems.map((item, index) => (
          <div key={index}>
            <Link href={`${pageLink}${item.workItemSlug}`}>
              <Image
                src={item.workItemImage}
                alt={item.workItemName}
                width={100}
                height={50}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="py-3 font-semibold">{item.workItemName}</div>
            </Link>
          </div>
        ))}
      </div>
      <BackButton backLink={`/`} />
    </div>
  );
};

export default JobItemContainer;
