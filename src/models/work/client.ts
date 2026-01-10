import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
  {
    clientName: { type: String, required: true },
    clientImage: String,
    clientDescriptionText: String,
    haveSingleWorkDetails: Boolean,
    clientSlug: { type: String, unique: true, index: true },
  },
  { timestamps: true }
);

const Client =
  mongoose.models.clients || mongoose.model("clients", clientSchema);

export default Client;

// import mongoose, { Schema } from "mongoose";

// const workSchema = new Schema({
//   clientName: String,
//   clientImage: String,
//   clientDescriptionText: String,
//   haveSingleWorkDetails: Boolean,
//   clientSlug: String,
// });

// const Client = mongoose.models.clients || mongoose.model("clients", workSchema);

// export default Client;
