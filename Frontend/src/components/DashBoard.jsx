import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import board from '../assets/icons/board.png';
import users from '../assets/icons/users.png';
import settings from '../assets/icons/settings.svg'
import { useDispatch, useSelector } from 'react-redux';
import { createBoards, fecthAllBoards, setActiveBoard } from '../redux/BoardSlice';
import { useNavigate } from 'react-router-dom';

function Functionalities({ src, title }) {
    return (
        <div className='hover:bg-gray-300 bg-gray-200 w-55 hover:shadow-lg rounded-md cursor-pointer px-3 py-2'>
            <div className='flex flex-row items-center gap-x-2 '>
                <img src={src} alt={title} className='size-4' />
                <span className='text-black/80 text-sm font-medium'>{title}</span>
            </div>
        </div>
    )
}

function DashBoard() {
    const { boards, activeBoardId, loading } = useSelector(
        (state) => state.boards
    )
    const dispatch = useDispatch();
    const [openBoard, setOpenBoard] = useState(false);
    const [title, setTitle] = useState('')
    const [background, setBackground] = useState(null);
    const navigate=useNavigate();
    const boardGradients = [
        {
            id: 1,
            type: "gradient",
            value: "linear-gradient(135deg, #667eea, #764ba2)"
        },
        {
            id: 2,
            type: "gradient",
            value: "linear-gradient(135deg, #43cea2, #185a9d)"
        },
        {
            id: 3,
            type: "gradient",
            value: "linear-gradient(135deg, #ff9966, #ff5e62)"
        },
        {
            id: 4,
            type: "gradient",
            value: "linear-gradient(135deg, #56ab2f, #a8e063)"
        }
    ];
    const boardImages = [
        {
            id: 1,
            type: "image",
            value: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        },
        {
            id: 2,
            type: "image",
            value: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        },
        {
            id: 3,
            type: "image",
            value: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        },
        {
            id: 4,
            type: "image",
            value: "https://images.unsplash.com/photo-1768918759275-cb220bfd26a4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }
    ];

    //Fetch All Boards
    useEffect(() => {
        try {
            dispatch(fecthAllBoards())
        } catch (error) {
            console.log('Fetching All boards Error', error);
        }
    }, [])

    //   creating Boards
    const handleCreateBoard = () => {
        try {
            if (!title || !background) return alert('Please provide Title and backgorund')
            dispatch(createBoards({ title, background }))
            console.log('Board Created', title, background)
            setTitle('');
            setBackground(null);
            setOpenBoard(false);
        } catch (error) {
            console.log('getting Error while creating Board', error)
        }
    }

    //open new Board
    const handleOpenBoard=(boardId)=>{
        dispatch(setActiveBoard(boardId));
        navigate('/');
    }
    return (
        <div className='flex flex-col '>
            <Navbar />
            <div className='flex px-4 py-2 flex-col gap-y-5'>
                <h2 className='text-black/65 text-md font-sans font-semibold'>YOUR WORKSPACES</h2>
                <div className='flex flex-row items-center gap-x-2'>
                    <div className='bg-linear-to-b from-[#d8e7c9] to-[#96ed3f] w-8 h-8 rounded-md flex justify-center p-2'>
                        <span className='text-white text-sm font-bold'>T</span>
                    </div>
                    <h3 className='text-md text-black/60 font-bold'>Trello Workspace</h3>
                </div>
                <div className='flex flex-wrap w-full gap-x-3 gap-y-2'>
                    <Functionalities src={board} title='Boards' />
                    <Functionalities src={users} title='Members' />
                    <Functionalities src={settings} title='Settings' />
                </div>
                <div className='flex flex-wrap w-full  gap-x-6 gap-y-4'>
                    {boards.map((board) => (
                        <div
                            key={board._id}
                            className="rounded-lg w-50 h-25 cursor-pointer hover:shadow-xl mb-5 hover:scale-110 transition-all ease-out duration-700"
                            onClick={()=>handleOpenBoard(board._id)}
                            style={{
                                background:
                                    typeof board.background === 'object'
                                        ? board.background.type === 'gradient'
                                            ? board.background.value
                                            : `url(${board.background.value}) center/cover`
                                        : board.background
                            }}
                        >
                            <h3 className="text-black/60 translate-y-22 mt-2  p-2 font-semibold">
                                {board.title}
                            </h3>
                        </div>
                    ))}
                    <div className='rounded-lg relative w-50 h-25 flex transform-3d hover:scale-105 bg-[#e4edebf3] cursor-pointer hover:bg-gray-300 hover:shadow-xl scale-100 justify-center items-center'
                        onClick={() => setOpenBoard(!openBoard)}>
                        <h4 className='text-sm text-black/60 font-serif'>Create new board</h4>
                    </div>
                </div>
                {/* creating board panel */}
                {openBoard && (
                    <div className='absolute   space-y-2 bg-white shadow-2xl rounded-md w-60 px-2 py-2 transition-all ease-in duration-500'>
                        <div className='flex justify-between items-center'>
                            <h5 className='text-black/60 text-sm font-semibold'>Create Board</h5>
                            <div className='w-6 h-6 hover:bg-gray-200 rounded-md cursor-pointer flex justify-center'>
                                <span className='text-gray-600  text-md transition-all ease-out duration-300' onClick={() => setOpenBoard(false)}>X</span>
                            </div>
                        </div>
                        <h6 className='text-black/55 text-sm font-stretch-semi-expanded'>Background</h6>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            {/* Images */}
                            {boardImages.map(bg => (
                                <div
                                    key={bg.id}
                                    className="w-14 h-10 rounded cursor-pointer hover:scale-110 transition"
                                    style={{
                                        backgroundImage: `url(${bg.value})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                    onClick={() => setBackground(bg)}
                                />
                            ))}

                            {/* Gradients */}
                            {boardGradients.map(bg => (
                                <div
                                    key={bg.id}
                                    className="w-14 h-10 rounded cursor-pointer hover:scale-110 transition"
                                    style={{ background: bg.value }}
                                    onClick={() => setBackground(bg)}
                                />
                            ))}
                        </div>
                        <div className='flex flex-col  gap-y-3 mt-2 w-full'>
                            <h6 className='text-black/80 text-sm font-semibold'>Title<span className='text-red-600  '>*</span></h6>
                            <input type="text" placeholder='Please Enter Title' value={title}
                                className='text-gray-600 cursor-pointer text-[12px] px-2 py-1 outline-none border-blue-500 border-2 font-semibold hover:border-red-500'
                                onChange={(e) => setTitle(e.target.value)} />
                            {title === '' && (
                                <p className='text-balck text-[12px] flex items-center font-serif'><span>👋</span>Board is Title is required</p>
                            )}
                        </div>
                        <div className={`w-full items-center flex mb-4  justify-center rounded-md px-2 py-2  ${title === '' ? 'bg-gray-100 cursor-not-allowed ' : 'bg-blue-500  cursor-pointer'}`}
                            onClick={handleCreateBoard}>
                            <span className='text-white'>Create</span>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default DashBoard
