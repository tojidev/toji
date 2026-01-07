import mongoose, { Schema } from "mongoose";

const workSchema = new Schema({
  clientName: String,
  clientImage: String,
  clientDescriptionText: String,
  haveSingleWorkDetails: Boolean,
  clientSlug: String,
});

const Client = mongoose.models.clients || mongoose.model("clients", workSchema);

export default Client;
