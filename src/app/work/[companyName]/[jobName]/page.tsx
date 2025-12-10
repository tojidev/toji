import React from "react";

async function jobItem({ params }: { params: Promise<{ jobName: string }> }) {
  const { jobName } = await params;
  return <div>jobItem {jobName}</div>;
}

export default jobItem;
