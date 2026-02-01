import { board } from "../models/Board.js";


export const getOrCreateBoard = async (req, res) => {
    try {
        const userId = req.user.id;
        const boards = await board.find({ user: userId })
        if (boards.length === 0) {
            const defaultBoard = await board.create({
                title: 'My Trello Board',
                user: userId,
                background: {
                    type: 'gradient',
                    value: 'linear-gradient(135deg, #667eea, #764ba2)'
                }
            })
            return res.status(200).json([defaultBoard]);
        }


        res.status(200).json(boards);
    } catch (error) {
        console.log('getting error while getting/creating default Board', error);
        res.status(500).json({ message: 'Create default Board Error' });
    }
}

export const createBoard=async(req,res)=>{
    try {
        const {title,background}=req.body
        const userId=req.user.id
        if(!title) return res.status(400).json({message:'Title is required'});
        const newBoard=await board.create({
            title,
            user:userId,
            background
        })
        await res.status(201).json(newBoard);
    } catch (error) {
        res.status(500).json({message:'Error while creating a board'});
        console.log('craeting board Error',error);
    }
}
export const getAllBoard=async(req,res)=>{
    try {
       const allboards=await board.find({user:req.user.id})
       await res.status(200).json(allboards);
    } catch (error) {
        res.status(500).json({message:'Error while fetching all boards'});
        console.log('Getting all boards Error',error);
    }
}