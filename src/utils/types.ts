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
  workItems: WorkItem[];
  pageLink: string;
};

export type UserParams = Promise<{
  userId: string;
}>;

export type ClientParams = Promise<{
  clientId: string;
}>;

export type WorkItemParams = Promise<{
  clientId: string;
  workItemId: string;
}>;

export type WorkItemDetailParams = Promise<{
  clientId: string;
  workItemId: string;
  workDetailId: string;
}>;

export type ClientWorkItem = {
  workItemImage: string;
  workItemDescription: string;
};

export interface AddWorkItemFormValues {
  workItemName: string;
  workItemImage: string;
  workItemDescription: string;
  clientIdRef: string;
  workItemSlug: string;
}

export interface AddWorkDetailFormValues {
  workDetailName: string;
  workDetailImage: string;
  workDetailDoubleSection: boolean;
  workDetailDescription: string;
  workItemIdRef: string;
  clientIdRef: string;
  workDetailSlug: string;
}
