import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    background: {
      type: { type: String },
      value: String
    }
  },
  { timestamps: true }
);

export const board = mongoose.model('Board', BoardSchema)