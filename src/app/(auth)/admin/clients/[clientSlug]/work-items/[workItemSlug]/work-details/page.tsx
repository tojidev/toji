import WorkTab from "@/app/(auth)/admin-components/WorkTabs";
import WorkDetailList from "@/app/(auth)/admin-components/clientsWork/work-details/WorkDetailList";
import AddWorkDetails from "@/app/(auth)/admin-components/clientsWork/work-details/AddWorkDetails";
import { toTitleCase } from "@/helper/common-logic";
import Breadcrumbs from "@/app/(auth)/admin-components/Breadcrumbs";

const WorkDetails = async ({
  params,
}: {
  params: Promise<{ clientSlug: string; workItemSlug: string }>;
}) => {
  const { clientSlug, workItemSlug } = await params;

  return (
    <>
      <Breadcrumbs />
      <h1 className="text-2xl text-black pb-6">Work Details</h1>

      <WorkTab
        tabs={[
          {
            key: "WorkDetailList",
            label: "Work Details List",
            content: (
              <WorkDetailList clientId={clientSlug} workItemId={workItemSlug} />
            ),
          },
          {
            key: "AddWorkDetail",
            label: "Add Work Detail",
            content: (
              <AddWorkDetails clientId={clientSlug} workItemId={workItemSlug} />
            ),
          },
        ]}
      />
    </>
  );
};

export default WorkDetails;
