import { ReactNode } from "react";

export type PageContainerProps = {
  LeftContents: ReactNode;
  RightcontentItems: ReactNode;
};

export type WorkItem = {
  imagePath: string;
  itemName: string;
};

export type WorkItemsProps = {
  name: string;
  workItems: WorkItem[];
  pageLink: string;
};
