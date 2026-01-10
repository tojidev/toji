import PageContainer from "@/components/common/PageContainer";
import JobItemContainer from "@/components/common/JobItemContainer";
import LeftWorkContent from "@/components/work/LeftWorkContent";
import { getClientBySlug, getWorkDetails, getWorkItems } from "@/helper/works";
import SingleContentContainer from "@/components/common/SingleContentContainer";

export default async function ClientPage({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) {
  const { companyName } = await params;
  const clientDetail = await getClientBySlug(companyName);
  // const { clientDetail, workData } = await getWorkItemsDetails(companyName)

  async function manageWorkDetails() {
    if (clientDetail.haveSingleWorkDetails) {
      const workDetails = await getWorkDetails(
        companyName,
        clientDetail.clientSlug
      );

      return (
        <SingleContentContainer
          workTitle={clientDetail.clientName}
          parentLink={`/`}
          workDetails={workDetails}
        />
      );
    } else {
      const workItems = await getWorkItems(companyName);
      return (
        <JobItemContainer
          workItems={workItems}
          pageLink={`/work/${companyName}/`}
        />
      );
    }
  }

  return (
    <>
      <PageContainer
        LeftContents={
          <LeftWorkContent
            headingText={clientDetail.clientName}
            leftBodyText={clientDetail.clientDescriptionText}
          />
        }
        RightcontentItems={manageWorkDetails()}
      />
    </>
  );
}
