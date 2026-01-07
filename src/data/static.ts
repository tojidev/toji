import { ClientType, WorkDetail, WorkItemTypes } from "@/utils/workTypes";

export const companyWorkItem = {
  name: "Work",
  workItems: [
    {
      imagePath: "/images/work/ananta.png",
      itemName: "Ananta",
    },
    {
      imagePath: "/images/work/kautilya.png",
      itemName: "Kautilya-Economic-Conclave",
    },
    {
      imagePath: "/images/work/industry.png",
      itemName: "Confederation-of-Indian-Industry",
    },
    {
      imagePath: "/images/work/foundation.png",
      itemName: "India@100-Foundation",
    },
    {
      imagePath: "/images/work/urban-emissions.png",
      itemName: "Urban-Emissions",
    },
    {
      imagePath: "/images/work/sidm.png",
      itemName: "SIDM",
    },
    {
      imagePath: "/images/work/shakti.png",
      itemName: "Shakti-Sustainable-Energy-Foundation",
    },
    {
      imagePath: "/images/work/helpage-india.png",
      itemName: "Helpage-India",
    },
    {
      imagePath: "/images/work/vertebrand.png",
      itemName: "Vertebrand",
    },
    {
      imagePath: "/images/work/writing-doc.png",
      itemName: "Writing-&-Documentation",
    },
    {
      imagePath: "/images/work/fhi.png",
      itemName: "FHI",
    },
    {
      imagePath: "/images/work/iVolunteer.png",
      itemName: "iVolunteer",
    },
  ],
};

export const jobItems = {
  name: "Work all items",
  workItems: [
    {
      imagePath: "/images/work/ananta/ac-ar-1.png",
      itemName: "Report",
    },
    {
      imagePath: "/images/work/ananta/nrgf2.png",
      itemName: "NRGF",
    },
    {
      imagePath: "/images/work/ananta/tsaals3.png",
      itemName: "TSAALS",
    },
    {
      imagePath: "/images/work/ananta/504shots_so.png",
      itemName: "Digital",
    },
  ],
};

export const jobItemsDetails = {
  name: "Ananta Work details ",
  workItemsDetails: [
    {
      imagePath: "/images/work/ananta/ac-ar-1.png",
      itemName: "Report",
    },
    {
      imagePath: "/images/work/ananta/nrgf2.png",
      itemName: "NRGF",
    },
    {
      imagePath: "/images/work/ananta/tsaals3.png",
      itemName: "TSAALS",
    },
    {
      imagePath: "/images/work/ananta/504shots_so.png",
      itemName: "Digital",
    },
  ],
};

export const clientInitialValues: Omit<ClientType, "_id"> = {
  clientName: "",
  clientImage: "",
  clientDescriptionText: "",
  haveSingleWorkDetails: false,
  clientSlug: "",
};
export const workItemInitialValues: Omit<WorkItemTypes, "_id"> = {
  workItemName: "",
  workItemImage: "",
  workItemDescription: "",
  clientIdRef: "",
  workItemSlug: "",
};

export function workDetailInitialValue(
  clientName: string,
  workItemName: string
) {
  const initialValues: Omit<WorkDetail, "_id"> = {
    workDetailName: "",
    workDetailImage: "",
    workDetailDoubleSection: false,
    workDetailDescription: "",
    clientIdRef: clientName,
    workItemIdRef: workItemName,
    workDetailSlug: "",
  };
  return initialValues;
}
