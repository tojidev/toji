import { connectDb } from "@/helper/db";
import WorkItemDetail from "@/models/work/workItemDetail";
import { WorkItemParams } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

connectDb();

// work Item detail

export async function GET(
  request: NextRequest,
  { params }: { params: WorkItemParams }
) {
  const { clientId, workItemId } = await params;

  let workItem = [];

  try {
    workItem = await WorkItemDetail.find({
      clientIdRef: clientId,
      workItemIdRef: workItemId,
    });
  } catch (error) {
    console.log("Not able to find the work item detail");
    console.log(error);
    return NextResponse.json({
      message: "Failed to get work Item detail",
      success: false,
    });
  }

  return NextResponse.json(workItem, { status: 200 });
}

export async function POST(request: NextRequest) {
  const {
    workDetailName,
    workDetailImage,
    workDetailDoubleSection,
    workDetailDescription,
    clientIdRef,
    workItemIdRef,
    workDetailSlug,
  } = await request.json();

  const workItemDetail = new WorkItemDetail({
    workDetailName,
    workDetailImage,
    workDetailDoubleSection,
    workDetailDescription,
    clientIdRef,
    workItemIdRef,
    workDetailSlug,
  });

  try {
    const workItemDetailData = await workItemDetail.save();
    return NextResponse.json(workItemDetailData, { status: 201 });
  } catch (error) {
    console.log("Faild to create new workItem");
    console.log(error);
    return NextResponse.json({
      message: "Failed to create new workItem...",
      status: false,
    });
  }
}
