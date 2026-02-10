// app/api/items/reorder/route.ts

import Client from "@/models/work/client";
import WorkItem from "@/models/work/workItem";
import WorkItemDetail from "@/models/work/workItemDetail";
import { NextResponse } from "next/server";

interface ReorderPayload {
  id: string;
  position: number;
}

export async function PUT(req: Request) {
  const updates = await req.json();

  try {
    if (updates.itemName === "clients") {
      await Client.bulkWrite(
        updates.payload.map(({ id, position }: ReorderPayload) => ({
          updateOne: {
            filter: { _id: id },
            update: { $set: { position } },
          },
        })),
      );
    }

    if (updates.itemName === "workItems") {
      await WorkItem.bulkWrite(
        updates.payload.map(({ id, position }: ReorderPayload) => ({
          updateOne: {
            filter: { _id: id },
            update: { $set: { position } },
          },
        })),
      );
    }

    if (updates.itemName === "workDetails") {
      await WorkItemDetail.bulkWrite(
        updates.payload.map(({ id, position }: ReorderPayload) => ({
          updateOne: {
            filter: { _id: id },
            update: { $set: { position } },
          },
        })),
      );
    }
  } catch (err) {
    console.log("something went wrong...", err);
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}
