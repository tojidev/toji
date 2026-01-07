import React from "react";
import ClientForm from "./ClientForm";
import ClientList from "./ClientList";
import WorkTab from "../../admin-components/WorkTabs";
import { clientInitialValues } from "@/data/static";
import { requireAuth } from "@/lib/auth";
import Breadcrumbs from "../../admin-components/Breadcrumbs";

const Clients: React.FC = async () => {
  const token = await requireAuth();

  return (
    <>
      <Breadcrumbs />
      <h1 className="text-2xl text-black pb-6">Clients</h1>

      {/* <ViewClients clients={getClients} /> */}
      <WorkTab
        tabs={[
          {
            key: "clients",
            label: "Clients",
            content: <ClientList />,
          },
          {
            key: "create",
            label: "Create Client",
            content: <ClientForm initialValues={clientInitialValues} />,
          },
        ]}
      />
    </>
  );
};

export default Clients;
