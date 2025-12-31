import PageContainer from "@/components/common/PageContainer";
import JobItemContainer from "@/components/common/JobItemContainer";
import LeftWorkContent from "@/components/work/LeftWorkContent";
import { getClientBySlug, getWorkItems } from "@/helper/works";

export default async function ClientPage({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) {
  const { companyName } = await params;
  const clientDetail = await getClientBySlug(companyName);
  const workItems = await getWorkItems(companyName);

  return (
    <>
      <PageContainer
        LeftContents={
          <LeftWorkContent
            headingText={clientDetail.clientName}
            leftBodyText={clientDetail.clientDescriptionText}
          />
        }
        RightcontentItems={
          <JobItemContainer
            workItems={workItems}
            pageLink={`/work/${companyName}/`}
          />
        }
      />
    </>
  );
}
