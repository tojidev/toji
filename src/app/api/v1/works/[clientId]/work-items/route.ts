import { connectDb } from "@/helper/db";
import WorkItem from "@/models/work/workItem";
import { ClientParams } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(
  request: NextRequest,
  { params }: { params: ClientParams },
) {
  const { clientId } = await params;

  let workItem = [];
  try {
    workItem = await WorkItem.find({ clientIdRef: clientId }).sort({
      position: 1,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Failed to get workItem data, ${error}`,
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
