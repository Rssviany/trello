import mongoose from "mongoose";

const inboxItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    resolved: {
      type: Boolean,
      default: false
    },
    completed: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export const InboxItem = mongoose.model("InboxItem", inboxItemSchema);
