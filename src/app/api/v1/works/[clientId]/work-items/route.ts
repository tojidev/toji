import { connectDb } from "@/helper/db";
import WorkItem from "@/models/work/workItem";
import { ClientParams } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

connectDb();

// workItems

export async function GET(
  request: NextRequest,
  { params }: { params: ClientParams }
) {
  const { clientId } = await params;

  let workItem = [];
  try {
    workItem = await WorkItem.find({ clientIdRef: clientId });
  } catch (error) {
    console.log("Not able to find the workItem");
    console.log(error);
    return NextResponse.json({
      message: "Failed to get workItem data",
      success: false,
    });
  }

  return NextResponse.json(workItem, { status: 200 });
}

export async function POST(request: NextRequest) {
  const {
    workItemName,
    workItemImage,
    workItemDescription,
    clientIdRef,
    workItemSlug,
  } = await request.json();

  console.log({
    workItemName,
    workItemImage,
    workItemDescription,
    clientIdRef,
    workItemSlug,
  });

  const workItem = new WorkItem({
    workItemName,
    workItemImage,
    workItemDescription,
    clientIdRef,
    workItemSlug,
  });

  try {
    const newworkItem = await workItem.save();
    return NextResponse.json(newworkItem, { status: 201 });
  } catch (error) {
    console.log("Faild to create new workItem");
    console.log(error);
    return NextResponse.json({
      message: "Failed to create new workItem...",
      status: false,
    });
  }
}

// export async function POST(request: NextRequest) {
//   const {
//     workItemLeftSectionContent,
//     workItemRightSectionContent,
//     clientIdRef,
//     workItemIdRef,
//     workItemSlug,
//   } = await request.json();

//   const workItem = new WorkItem({
//     workItemLeftSectionContent,
//     workItemRightSectionContent,
//     clientIdRef,
//     workItemIdRef,
//     workItemSlug,
//   });

//   try {
//     const newworkItem = await workItem.save();
//     return NextResponse.json(newworkItem, { status: 201 });
//   } catch (error) {
//     console.log("Faild to create new workItem");
//     console.log(error);
//     return NextResponse.json({
//       message: "Failed to create new workItem...",
//       status: false,
//     });
//   }
// }
