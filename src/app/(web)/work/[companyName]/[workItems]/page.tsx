import PageContainer from "@/components/common/PageContainer";
import SingleContentContainer from "@/components/common/SingleContentContainer";
import LeftWorkContent from "@/components/work/LeftWorkContent";
// import { jobItemsDetails } from "@/data/static";
import {
  // getClientBySlug,
  getWorkDetails,
  getWorkItemBySlug,
} from "@/helper/works";

async function WorkItems({
  params,
}: {
  params: Promise<{ companyName: string; workItems: string }>;
}) {
  const { companyName, workItems } = await params;
  // const clientDetail = await getClientBySlug(companyName);
  const workItemData = await getWorkItemBySlug(companyName, workItems);
  const workDetails = await getWorkDetails(companyName, workItems);

  return (
    <>
      <PageContainer
        LeftContents={
          <LeftWorkContent
            headingText={workItemData.workItemName}
            leftBodyText={workItemData.workItemDescription}
          />
        }
        RightcontentItems={
          <SingleContentContainer
            workTitle={workItemData.workItemName}
            parentLink={`/work/${workItemData.clientIdRef}`}
            workDetails={workDetails}
          />
        }
      />
    </>
  );
}

export default WorkItems;
