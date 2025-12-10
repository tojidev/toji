import React from "react";
import { PageContainerProps } from "@/utils/types";

const PageContainer: React.FC<PageContainerProps> = ({
  LeftContents,
  RightcontentItems,
}) => {
  return (
    <section className="mt-8">
      <div className="container max-w-[1440px] mx-auto">
        <div className="sm:flex gap-x-4">
          <div className="w-full sm:w-1/2 sm:pr-20">{LeftContents}</div>
          <div className="w-full sm:w-2/2">{RightcontentItems}</div>
        </div>
      </div>
    </section>
  );
};

export default PageContainer;
