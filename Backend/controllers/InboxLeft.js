import { InboxItem } from "../models/Inbox.js";

export const createInbox = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const item = await InboxItem.create({
      title,
      user: userId
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("Error creating inbox item:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getInboxItems = async (req, res) => {
  const items = await InboxItem
    .find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(items);
};

export const updateInboxItems = async (req, res) => {
  try {
    const { completed } = req.body;

    const updated = await InboxItem.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { completed },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error("Update inbox error:", error);
    res.status(500).json({ message: "Server error" });
  }
};