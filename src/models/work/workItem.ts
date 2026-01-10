import mongoose, { Schema } from "mongoose";

const workItemSchema = new Schema(
  {
    workItemName: { type: String, required: true },
    workItemImage: String,
    workItemDescription: String,

    clientIdRef: {
      type: String,
      required: true,
      index: true,
    },

    workItemSlug: { type: String, unique: true, index: true },
  },
  { timestamps: true }
);

const WorkItem =
  mongoose.models.workItems || mongoose.model("workItems", workItemSchema);

export default WorkItem;

// import mongoose, { Schema } from "mongoose";

// const workItemSchema = new Schema({
//   workItemName: String,
//   workItemImage: String,
//   workItemDescription: String,
//   clientIdRef: String,
//   workItemSlug: String,
// });

// const WorkItem =
//   mongoose.models.workItems || mongoose.model("workItems", workItemSchema);

// export default WorkItem;
