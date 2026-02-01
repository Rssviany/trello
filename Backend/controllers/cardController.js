import { card } from "../models/Card.js";

export const createCard = async (req, res) => {
  try {
    const { title, boardId, listId } = req.body;

    if (!title || !boardId || !listId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const count = await card.countDocuments({ list: listId });

    const newCard = await card.create({
      title,
      board: boardId,
      list: listId,
      order: count,
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.log("Getting error while creating card", error);
    res.status(500).json({ message: "Card Error", error });
  }
};

export const getAllCards = async (req, res) => {
  try {
    const { boardId } = req.query;

    const cards = await card
      .find({ board: boardId })
      .sort({ order: 1 });

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cards" });
  }
};


export const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const deletedCard = await card.findByIdAndDelete(cardId);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Card deleted successfully", cardId });
  } catch (error) {
    console.error("Error deleting card", error);
    res.status(500).json({ message: "Failed to delete card" });
  }
};