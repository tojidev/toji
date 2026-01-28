import PageContainer from "@/components/common/PageContainer";
import LeftStaticContent from "@/components/home/LeftStaticContent";
import ContentItemContainer from "@/components/common/ContentItemContainer";

import { getClients } from "@/helper/works";

export const dynamic = "force-dynamic";

export default async function Home() {
  const clientsData = await getClients();

  return (
    <>
      <PageContainer
        LeftContents={<LeftStaticContent />}
        RightcontentItems={
          <ContentItemContainer
            clients={clientsData}
            pageName="Work"
            pageLink="/work/"
          />
        }
      />
    </>
  );
}
