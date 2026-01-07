import { connectDb } from "@/helper/db";
import Client from "@/models/work/client";
import { NextRequest, NextResponse } from "next/server";

connectDb();

// Clients

export async function GET() {
  let client = [];

  try {
    client = await Client.find();
  } catch (error) {
    console.log("Not able to find the client");
    console.log(error);
    return NextResponse.json({
      message: "Failed to get client data",
      success: false,
    });
  }

  return NextResponse.json(client, { status: 200 });
}

export async function POST(request: NextRequest) {
  const {
    clientSlug,
    clientName,
    clientImage,
    haveSingleWorkDetails,
    clientDescriptionText,
  } = await request.json();

  const client = new Client({
    clientSlug,
    clientName,
    clientImage,
    haveSingleWorkDetails,
    clientDescriptionText,
  });

  try {
    const newClient = await client.save();
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.log("Faild to create new client");
    console.log(error);
    return NextResponse.json({
      message: "Failed to create the client...",
      status: false,
    });
  }
}
