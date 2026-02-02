import PageContainer from "@/components/common/PageContainer";
import JobItemContainer from "@/components/common/JobItemContainer";
import LeftWorkContent from "@/components/work/LeftWorkContent";
import { getClientBySlug, getWorkDetails, getWorkItems } from "@/helper/works";
import SingleContentContainer from "@/components/common/SingleContentContainer";
import { Metadata } from "next";
import { classesLeftContainer, classesRightContainer } from "@/data/static";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Be the better business. We can help. | Toji Communication Consultancy",
  description:
    "There's little that communication cannot solve. If you have a problem, we have a solution. Try us.",
};

export default async function ClientPage({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) {
  const { companyName } = await params;
  const clientDetail = await getClientBySlug(companyName);

  async function manageWorkDetails() {
    if (clientDetail.haveSingleWorkDetails) {
      const workDetails = await getWorkDetails(
        companyName,
        clientDetail.clientSlug,
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

  const leftContainerClass = clientDetail.haveSingleWorkDetails
    ? "w-full sm:w-1/4 sm:pr-8"
    : classesLeftContainer;
  const rightContainerClass = clientDetail.haveSingleWorkDetails
    ? "w-full sm:w-3/4"
    : classesRightContainer;

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
        classLeftContainer={leftContainerClass}
        classRightContainer={rightContainerClass}
      />
    </>
  );
}
