import { connectDb } from "@/helper/db";
import WorkItemDetail from "@/models/work/workItemDetail";
import { WorkItemDetailParams } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

connectDb();

// Work Item details id separate detail

export async function GET(
  request: NextRequest,
  { params }: { params: WorkItemDetailParams }
) {
  const { workDetailId } = await params;

  try {
    const workDetailData = await WorkItemDetail.findOne({
      workDetailSlug: workDetailId,
    });

    return NextResponse.json(workDetailData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to load work detail",
      success: false,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: WorkItemDetailParams }
) {
  const { clientId, workItemId, workDetailId } = await params;

  const {
    workDetailName,
    workDetailImage,
    workDetailDoubleSection,
    workDetailDescription,
    workDetailSlug,
  } = await request.json();

  try {
    const workDetailFind = await WorkItemDetail.findOne({
      workDetailSlug: workDetailId,
    });
    workDetailFind.workDetailName = workDetailName;
    workDetailFind.workDetailImage = workDetailImage;
    workDetailFind.workDetailDoubleSection = workDetailDoubleSection;
    workDetailFind.workDetailDescription = workDetailDescription;
    workDetailFind.clientIdRef = clientId;
    workDetailFind.workItemIdRef = workItemId;
    workDetailFind.workDetailSlug = workDetailSlug;

    const workDetailUpdated = await workDetailFind.save();
    const updatedResponse = NextResponse.json(workDetailUpdated, {
      status: 200,
    });

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
  { params }: { params: WorkItemDetailParams }
) {
  const { workDetailId } = await params;

  try {
    console.log("workDetailId");
    console.log(workDetailId);
    const deletedworkDetail = await WorkItemDetail.deleteOne({
      workDetailSlug: workDetailId,
    });

    return NextResponse.json({
      message: `workItem ${
        deletedworkDetail.deletedCount
          ? "deleted successfully!"
          : "deletion is not completed or recognised"
      }!`,
      deleted_workItem: deletedworkDetail,
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
