import PageContainer from "@/components/common/PageContainer";
import JobItemContainer from "@/components/common/JobItemContainer";
import { jobItems } from "@/app/data/static";
import LeftWorkContent from "@/components/work/LeftWorkContent";
const CompanyName = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const { companyName } = await params;
  return (
    <>
      <PageContainer
        LeftContents={<LeftWorkContent />}
        RightcontentItems={
          <JobItemContainer {...jobItems} pageLink={`/work/${companyName}/`} />
        }
      />
    </>
  );
};

export default CompanyName;
