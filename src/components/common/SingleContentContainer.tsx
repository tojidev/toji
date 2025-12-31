import React from "react";
import Image from "next/image";
import { WorkDetail, WorkItemTypes } from "@/utils/workTypes";
import BackButton from "./BackButton";

const SingleContentContainer: React.FC<{
  workItemData: WorkItemTypes;
  workDetails: WorkDetail[];
}> = ({ workItemData, workDetails }) => {
  return (
    <div>
      <div className="italic-text text-xl mb-2">
        {workItemData.workItemName}
      </div>
      <div className="gap-4">
        {workDetails.map((item) => (
          <div key={item._id} className="mb-8">
            {item.workDetailDoubleSection ? (
              <div className="flex items-center justify-center gap-4-">
                <div className="flex-1 text-left">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item?.workDetailDescription
                        ? item?.workDetailDescription
                        : "<p>No text is vailable here...</p>",
                    }}
                  />
                </div>
                <div className="flex-1">
                  <Image
                    src={item.workDetailImage}
                    alt={item.workDetailName}
                    width={100}
                    height={50}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <Image
                  src={item.workDetailImage}
                  alt={item.workDetailName}
                  width={100}
                  height={50}
                  style={{ width: "100%", height: "auto" }}
                />
                {/* <div className="py-3">{item.workDetailName}</div> */}
              </div>
            )}
          </div>
        ))}
        <BackButton />
      </div>
    </div>
  );
};

export default SingleContentContainer;
