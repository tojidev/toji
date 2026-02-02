import { ClientType, WorkDetail, WorkItemTypes } from "@/utils/workTypes";

export const classesLeftContainer = "w-full sm:w-1/2 sm:pr-20";

export const classesRightContainer = "w-full sm:w-2/2";

export const clientInitialValues: ClientType = {
  clientName: "",
  clientImage: "",
  clientDescriptionText: "",
  haveSingleWorkDetails: false,
  clientSlug: "",
};

export function workItemInitialValues(clientId: string) {
  const initialValues: WorkItemTypes = {
    _id: "",
    workItemName: "",
    workItemImage: "",
    workItemDescription: "",
    clientIdRef: clientId,
    workItemSlug: "",
  };

  return initialValues;
}

export function workDetailInitialValue(
  clientName: string,
  workItemName: string,
) {
  const initialValues: WorkDetail = {
    workDetailName: "",
    workDetailImage: "",
    workDetailDoubleSection: false,
    workDetailDescription: "",
    clientIdRef: clientName,
    workItemIdRef: workItemName,
    workDetailSlug: "",
  };
  return initialValues;
}
