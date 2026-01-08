import React from "react";
import Image from "next/image";
import { WorkDetail } from "@/utils/workTypes";
import BackButton from "./BackButton";
import { isURL } from "@/helper/common-logic";

const SingleContentContainer: React.FC<{
  workDetails: WorkDetail[];
  workTitle: string;
  parentLink: string;
}> = ({ workDetails, workTitle, parentLink }) => {
  return (
    <div>
      <div className="italic-text text-xl mb-2">{workTitle}</div>
      <div className="gap-4">
        {workDetails.map((item) => (
          <div key={item._id} className="mb-8">
            {item.workDetailDoubleSection &&
            isURL(item.workDetailDescription) ? (
              <div className="flex items-center justify-center gap-4-">
                <div className="flex-1 text-left">
                  <div className="pr-4">
                    <Image
                      src={item.workDetailDescription}
                      alt={item.workDetailDescription}
                      width={100}
                      height={50}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="pl-4">
                    <Image
                      src={item.workDetailImage}
                      alt={item.workDetailName}
                      width={100}
                      height={50}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
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
        <BackButton backLink={parentLink} />
      </div>
    </div>
  );
};

export default SingleContentContainer;
