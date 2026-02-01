import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export const card= mongoose.model("Card", cardSchema);
