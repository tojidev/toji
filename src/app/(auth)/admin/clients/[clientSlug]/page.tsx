import React from "react";

import WorkTab from "@/app/(auth)/admin-components/WorkTabs";
import WorkItemList from "./WorkItemList";
import AddWorkItem from "./AddWorkItem";
import Breadcrumbs from "@/app/(auth)/admin-components/Breadcrumbs";
import WorkDetailList from "@/app/(auth)/admin-components/clientsWork/work-details/WorkDetailList";
import AddWorkDetails from "@/app/(auth)/admin-components/clientsWork/work-details/AddWorkDetails";

async function getClient(ids: string) {
  const getRes = await fetch(`${process.env.API_BASE_URL}/works/${ids}`);
  const getResp = await getRes.json();
  return getResp;
}

const WorkItems = async ({
  params,
}: {
  params: Promise<{ clientSlug: string }>;
}) => {
  const { clientSlug } = await params;
  const workItemSlug = clientSlug;

  const currentClient = await getClient(clientSlug);

  function workAndDetails() {
    if (currentClient.haveSingleWorkDetails) {
      return (
        <WorkTab
          tabs={[
            {
              key: "WorkDetailList",
              label: "Work Details List",
              content: (
                <WorkDetailList
                  clientId={clientSlug}
                  workItemId={workItemSlug}
                />
              ),
            },
            {
              key: "AddWorkDetail",
              label: "Add Work Detail",
              content: (
                <AddWorkDetails
                  clientId={clientSlug}
                  workItemId={workItemSlug}
                />
              ),
            },
          ]}
        />
      );
    } else {
      return (
        <WorkTab
          tabs={[
            {
              key: "WorkItemList",
              label: "Work Item List",
              content: <WorkItemList clientId={clientSlug} />,
            },
            {
              key: "AddWorkItem",
              label: "Add Work Item",
              content: <AddWorkItem clientId={clientSlug} />,
            },
          ]}
        />
      );
    }
  }

  return (
    <>
      <Breadcrumbs />
      <h1 className="text-2xl text-black pb-6">
        {currentClient.clientName}{" "}
        {currentClient.haveSingleWorkDetails ? "work details" : "work items"}
      </h1>

      {workAndDetails()}
    </>
  );
};

export default WorkItems;
