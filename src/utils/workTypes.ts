export interface ClientType {
  _id: string;
  haveSingleWorkDetails: boolean;
  clientName: string;
  clientImage: string;
  clientDescriptionText: string;
  clientSlug: string;
}

export interface WorkItemTypes {
  _id: string;
  workItemName: string;
  workItemImage: string;
  workItemDescription: string;
  clientIdRef: string;
  workItemSlug: string;
}

export interface WorkDetail {
  _id: string;
  workDetailName: string;
  workDetailImage: string;
  workDetailDoubleSection: boolean;
  workDetailDescription: string;
  workItemIdRef: string;
  clientIdRef: string;
  workDetailSlug: string;
}
