import React from "react";
import { PageContainerProps } from "@/utils/types";
import { classesLeftContainer, classesRightContainer } from "@/data/static";

const PageContainer: React.FC<PageContainerProps> = ({
  LeftContents,
  RightcontentItems,
  classLeftContainer = classesLeftContainer,
  classRightContainer = classesRightContainer,
}) => {
  return (
    <section className="mt-8">
      <div className="container max-w-[1440px] mx-auto">
        <div className="sm:flex gap-x-4">
          <div className={classLeftContainer}>{LeftContents}</div>
          <div className={classRightContainer}>{RightcontentItems}</div>
        </div>
      </div>
    </section>
  );
};

export default PageContainer;
