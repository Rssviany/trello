import { list } from "../models/List.js";

export const createList = async (req, res) => {
    try {
        const { title, boardId } = req.body;

        if (!title || !boardId) {
            return res.status(400).json({ message: "Title and boardId required" });
        }

        const count = await list.countDocuments({ board: boardId });

        const newList = await list.create({
            title,
            board: boardId,
            order: count
        });

        res.status(201).json(newList);
    } catch (error) {
        console.error("Error creating list:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getAllList = async (req, res) => {
    try {
        const { boardId } = req.query;

        if (!boardId) {
            return res.status(400).json({ message: "boardId required" });
        }

        const lists = await list
            .find({ board: boardId })
            .sort({ order: 1 });

        res.status(200).json(lists);
    } catch (error) {
        console.error("Error getting lists:", error);
        res.status(500).json({ message: "Server error" });
    }
};
