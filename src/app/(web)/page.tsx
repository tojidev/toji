import PageContainer from "@/components/common/PageContainer";
import LeftStaticContent from "@/components/home/LeftStaticContent";
import ContentItemContainer from "@/components/common/ContentItemContainer";

import { getClients } from "@/helper/works";

export default async function Home() {
  const clientsData = await getClients();

  const fetchData = await fetch(`${process.env.API_BASE_URL}/works`, {
    cache: "no-cache",
  });
  const clientFetch = await fetchData.json();

  console.log(clientFetch);

  return (
    <>
      <ContentItemContainer
        clients={clientFetch}
        pageName="Work"
        pageLink="/work/"
      />
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
