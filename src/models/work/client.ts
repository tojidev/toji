import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
  {
    clientName: { type: String, required: true },
    clientImage: String,
    clientDescriptionText: String,
    haveSingleWorkDetails: Boolean,

    position: {
      type: Number,
      default: 0,
      index: true,
    },
    clientSlug: { type: String, unique: true, index: true },
  },
  { timestamps: true },
);

const Client =
  mongoose.models.clients || mongoose.model("clients", clientSchema);

export default Client;
