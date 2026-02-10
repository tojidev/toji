export interface ClientType {
  _id?: string | undefined;
  haveSingleWorkDetails: boolean;
  clientName: string;
  clientImage: string;
  position?: number;
  clientDescriptionText: string;
  clientSlug: string;
}

export interface WorkItemTypes {
  _id?: string | undefined;
  workItemName: string;
  workItemImage: string;
  workItemDescription: string;
  position?: number;
  clientIdRef: string;
  workItemSlug: string;
}

export interface WorkDetail {
  _id?: string | undefined;
  workDetailName: string;
  workDetailImage: string;
  workDetailDoubleSection: boolean;
  workDetailDescription: string;
  position?: number;
  workItemIdRef: string;
  clientIdRef: string;
  workDetailSlug: string;
}
