import mongoose, { Schema } from "mongoose";

const workDetailSchema = new Schema(
  {
    workDetailName: String,
    workDetailImage: String,
    workDetailDoubleSection: Boolean,
    workDetailDescription: String,

    workItemIdRef: {
      type: String,
      required: true,
      index: true,
    },

    clientIdRef: {
      type: String,
      required: true,
      index: true,
    },

    workDetailSlug: { type: String, unique: true, index: true },
  },
  { timestamps: true }
);

const WorkItemDetail =
  mongoose.models.workItemDetail ||
  mongoose.model("workItemDetail", workDetailSchema);

export default WorkItemDetail;

// import mongoose, { Schema } from "mongoose";

// const workItemSchema = new Schema({
//   workDetailName: String,
//   workDetailImage: String,
//   workDetailDoubleSection: Boolean,
//   workDetailDescription: String,
//   workItemIdRef: String,
//   clientIdRef: String,
//   workDetailSlug: String,
// });

// const WorkItemDetail =
//   mongoose.models.workItemDetail ||
//   mongoose.model("workItemDetail", workItemSchema);

// export default WorkItemDetail;
