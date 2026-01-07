import { connectDb } from "@/helper/db";
import Client from "@/models/work/client";
import { ClientParams } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(
  request: NextRequest,
  { params }: { params: ClientParams }
) {
  console.log("loading all params");
  const { clientId } = await params;

  try {
    const client = await Client.findOne({ clientSlug: clientId });

    return NextResponse.json(client);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to load client",
      success: false,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: ClientParams }
) {
  const { clientId } = await params;

  const {
    clientSlug,
    clientName,
    clientImage,
    haveSingleWorkDetails,
    clientDescriptionText,
  } = await request.json();
  // console.log(await request.json());
  console.log(haveSingleWorkDetails);

  try {
    const clientFind = await Client.findOne({ clientSlug: clientId });
    clientFind.clientSlug = clientSlug;
    clientFind.clientName = clientName;
    clientFind.clientImage = clientImage;
    clientFind.haveSingleWorkDetails = haveSingleWorkDetails;
    clientFind.clientDescriptionText = clientDescriptionText;

    console.log("clint updated here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(clientFind);

    const clientUpdated = await clientFind.save();
    const updatedResponse = NextResponse.json(clientUpdated, { status: 200 });

    return updatedResponse;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to update client",
      success: false,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: ClientParams }
) {
  const { clientId } = await params;

  try {
    console.log("clientId");
    console.log(clientId);
    const deletedClient = await Client.deleteOne({
      clientSlug: clientId,
    });

    return NextResponse.json({
      message: "Client deleted successfully!",
      deleted_client: deletedClient,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to delete Client",
      success: false,
    });
  }
}
