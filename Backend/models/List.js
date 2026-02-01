import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export const list = mongoose.model('List', ListSchema)