import { connectDb } from "@/helper/db";
import { ClientType, WorkItemTypes, WorkDetail } from "@/utils/workTypes";
import Client from "@/models/work/client";
import WorkItem from "@/models/work/workItem";
import WorkItemDetail from "@/models/work/workItemDetail";

/* -------------------- Clients -------------------- */
await connectDb();

export async function getClients(): Promise<ClientType[]> {
  await connectDb();

  return Client.find().lean();
}

export async function getClientBySlug(clientSlug: string): Promise<ClientType> {
  await connectDb();
  const clientName = clientSlug.toLowerCase();
  const client = await Client.findOne({ clientSlug: clientName });
  return client;
}

export async function getWorkItemsDetails(clientSlug: string): Promise<{
  clientDetail: ClientType;
  workData: WorkItemTypes[] | WorkDetail[];
}> {
  await connectDb();

  const clientDetail = await Client.findOne({
    clientSlug: clientSlug.toLowerCase(),
  });
  let workData;

  if (clientDetail.haveSingleWorkDetails) {
    workData = await WorkItemDetail.find({
      clientIdRef: clientSlug.toLowerCase(),
      workItemIdRef: clientDetail.clientSlug,
    }).lean();
  } else {
    workData = await WorkItem.find({
      clientIdRef: clientSlug.toLowerCase(),
    }).lean();
  }

  return { clientDetail, workData };
}

/* -------------------- Work Items -------------------- */

export async function getWorkItems(
  clientSlug: string,
): Promise<WorkItemTypes[]> {
  await connectDb();
  const clientName = clientSlug.toLowerCase();
  const clientsWorks = await WorkItem.find({ clientIdRef: clientName }).lean();
  return clientsWorks;
}

export async function getWorkItemBySlug(
  clientSlug: string,
  workItemSlug: string,
): Promise<WorkItemTypes> {
  await connectDb();

  const clientName = clientSlug.toLowerCase();
  const workItemName = workItemSlug.toLowerCase();
  const clientsWork = await WorkItem.findOne({
    clientIdRef: clientName,
    workItemSlug: workItemName,
  }).lean();
  return clientsWork;
}

/* -------------------- Work Details -------------------- */

export async function getWorkDetails(
  clientSlug: string,
  workItemSlug: string,
): Promise<WorkDetail[]> {
  await connectDb();

  const clientName = clientSlug.toLowerCase();
  const workItemName = workItemSlug.toLowerCase();

  const workDetails = await WorkItemDetail.find({
    clientIdRef: clientName,
    workItemIdRef: workItemName,
  });

  return workDetails;
}

export async function getWorkDetailsBySlug(
  clientSlug: string,
  workItemSlug: string,
  workDetailSlug: string,
): Promise<WorkDetail | null> {
  await connectDb();

  const clientName = clientSlug.toLowerCase();
  const workItemName = workItemSlug.toLowerCase();
  const workDetailName = workDetailSlug.toLowerCase();
  const workDetails = await WorkItemDetail.findOne({
    clientIdRef: clientName,
    workItemIdRef: workItemName,
    workDetailSlug: workDetailName,
  });

  return workDetails;
}

// import { serverGet } from "@/lib/apicall";
// import { Client, WorkDetail, WorkItemTypes } from "@/utils/workTypes";

// export function getClients() {
//   return serverGet<Client[]>("/works");
// }

// export function getClientBySlug(clientSlug: string) {
//   return serverGet<Client>(`/works/${clientSlug.toLowerCase()}`);
// }

// export function getWorkItems(clientSlug: string) {
//   return serverGet<WorkItemTypes[]>(
//     `/works/${clientSlug.toLowerCase()}/work-items`
//   );
// }

// export function getWorkItemBySlug(clientSlug: string, workItemSlug: string) {
//   return serverGet<WorkItemTypes>(
//     `/works/${clientSlug.toLowerCase()}/work-items/${workItemSlug.toLowerCase()}`
//   );
// }

// export function getWorkDetails(clientSlug: string, workItemSlug: string) {
//   return serverGet<WorkDetail[]>(
//     `/works/${clientSlug.toLowerCase()}/work-items/${workItemSlug.toLowerCase()}/work-details/`
//   );
// }

// export function getWorkDetailsById(
//   clientSlug: string,
//   workItemSlug: string,
//   workDetailSlug: string
// ) {
//   return serverGet<WorkDetail>(
//     `/works/${clientSlug.toLowerCase()}/work-items/${workItemSlug.toLowerCase()}/work-details/${workDetailSlug.toLowerCase()}`
//   );
// }
