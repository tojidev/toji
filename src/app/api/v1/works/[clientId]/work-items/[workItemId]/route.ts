import { connectDb } from "@/helper/db";
import WorkItem from "@/models/work/workItem";
import { WorkItemParams } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(
  request: NextRequest,
  { params }: { params: WorkItemParams }
) {
  const { workItemId } = await params;

  try {
    const workItemData = await WorkItem.findOne({
      workItemSlug: workItemId,
    });

    return NextResponse.json(workItemData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to load workItem",
      success: false,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: WorkItemParams }
) {
  const { clientId, workItemId } = await params;

  const { workItemName, workItemImage, workItemDescription, workItemSlug } =
    await request.json();

  try {
    const workItemFind = await WorkItem.findOne({
      workItemSlug: workItemId,
    });
    workItemFind.workItemName = workItemName;
    workItemFind.workItemImage = workItemImage;
    workItemFind.workItemDescription = workItemDescription;
    workItemFind.clientIdRef = clientId;
    workItemFind.workItemSlug = workItemSlug;

    const workItemUpdated = await workItemFind.save();
    const updatedResponse = NextResponse.json(workItemUpdated, { status: 200 });

    return updatedResponse;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to update workItem",
      success: false,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: WorkItemParams }
) {
  const { workItemId } = await params;

  try {
    console.log("workItemId");
    console.log(workItemId);
    const deletedworkItem = await WorkItem.deleteOne({
      workItemSlug: workItemId,
    });

    return NextResponse.json({
      message: `workItem ${
        deletedworkItem.deletedCount
          ? "deleted successfully!"
          : "deletion is not completed or recognised"
      }!`,
      deleted_workItem: deletedworkItem,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to delete workItem",
      success: false,
    });
  }
}
