import React from "react";
import ClientList from "./ClientList";
import WorkTab from "../../admin-components/WorkTabs";

import Breadcrumbs from "../../admin-components/Breadcrumbs";
import AddClient from "./AddClient";

const Clients: React.FC = async () => {
  return (
    <>
      <Breadcrumbs />
      <h1 className="text-2xl text-black pb-6">Clients</h1>

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
            content: <AddClient />,
          },
        ]}
      />
    </>
  );
};

export default Clients;
