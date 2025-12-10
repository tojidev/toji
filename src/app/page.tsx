import PageContainer from "@/components/common/PageContainer";
import LeftStaticContent from "@/components/home/LeftStaticContent";
import ContentItemContainer from "@/components/common/ContentItemContainer";
import { companyWorkItem } from "./data/static";

export default function Home() {
  return (
    <>
      <PageContainer
        LeftContents={<LeftStaticContent />}
        RightcontentItems={
          <ContentItemContainer {...companyWorkItem} pageLink="/work/" />
        }
      />
    </>
  );
}
