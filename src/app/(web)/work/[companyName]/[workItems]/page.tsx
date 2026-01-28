import PageContainer from "@/components/common/PageContainer";
import SingleContentContainer from "@/components/common/SingleContentContainer";
import LeftWorkContent from "@/components/work/LeftWorkContent";
// import { jobItemsDetails } from "@/data/static";
import {
  // getClientBySlug,
  getWorkDetails,
  getWorkItemBySlug,
} from "@/helper/works";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Toji Communication Consultancy - Be the better business. We can help.",
  description:
    "There's little that communication cannot solve. If you have a problem, we have a solution. Try us.",
};

async function WorkItems({
  params,
}: {
  params: Promise<{ companyName: string; workItems: string }>;
}) {
  const { companyName, workItems } = await params;
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
