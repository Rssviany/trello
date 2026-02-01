import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import announcement from '../assets/icons/announcement.png'
import dashboard from '../assets/icons/dashboard.png'
import notification from '../assets/icons/notification.png'
import question from '../assets/icons/question.png'
import search from '../assets/icons/search.png'
import board from '../assets/icons/board.png'
import home from '../assets/icons/home.png'
import template from '../assets/icons/template.png'
import trello from '../assets/images/trello.png'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInitials } from '../redux/UserSelector'
import { logout } from '../redux/UserSlice'


function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [dashOpen, setdashOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const createRef = useRef(null);
    const dashRef = useRef(null);
    const openRef = useRef(null);
    const initials = useSelector(selectUserInitials);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                createRef.current &&
                !createRef.current.contains(e.target) &&
                dashRef.current &&
                !dashRef.current.contains(e.target) &&
                openRef.current &&
                !openRef.current.contains(e.target)
            ) {
                setOpen(false);
                setdashOpen(false);
                setUserOpen(false)
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setUserOpen(false);
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className='bg-white md:px-4 px-2 py-4 flex flex-row items-center justify-between'>
            {/* left */}
            <div className='flex flex-row md:gap-x-3 gap-x-2  items-center transition-all ease-in-out'>
                <div className='w-9 h-9 flex items-center rounded-md justify-center cursor-point hover:bg-[#E4E6EA] transition '>
                    <div className='relative' ref={dashRef}>
                        <img src={dashboard} className=' size-5 hover:bg-gray-200  ' onClick={() => setdashOpen(!dashOpen)} />
                        <div className={`${dashOpen ? 'block' : 'hidden'} absolute z-30 -left-3 translate-y-5 bg-white border border-gray-300 h-150 rounded-md w-70 transition-all duration-200`}>
                            <Link to='/'>
                                <div className='flex flex-row gap-x-4 items-center px-4 py-3 hover:bg-[#E4E6EA] rounded-md m-1'>
                                    <img src={home} className='size-6' />
                                    <p className='text-gray-400 font-medium text-md cursor-pointer'>Home</p>
                                </div>
                            </Link>
                            <Link to='/dashboard'>
                                <div className='flex flex-row gap-x-4 items-center px-4 py-3 hover:bg-[#E4E6EA] rounded-md m-1'>
                                    <img src={trello} className='size-6' />
                                    <p className='text-gray-400 font-medium text-md cursor-pointer'>Trello</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-x-1  '>
                    <img src={trello} className=' size-5' />
                    <div className='w-10 h-9 flex items-center rounded-md justify-center cursor-point hover:bg-[#E4E6EA] transition '>
                        <p className='text-black  md:text-l hidden md:block text-sm font-medium'>Trello </p>
                    </div>
                </div>
            </div>
            {/* middle */}
            <div className="flex flex-row items-center gap-x-2  transition-all ease-in-out">
                <div className="relative flex items-center">
                    <div className="flex items-center h-9 px-2 bg-white border border-gray-300 rounded-md transition-all duration-300 hover:bg-[#F4F5F7] focus-within:border-blue-500 ">
                        <img src={search} className="size-4 text-gray-500" alt="search" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="ml-2  w-35 md:w-100 lg:w-150 xl:170  bg-transparent outline-none text-sm text-gray-900 placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="relative" ref={createRef}>
                    <button
                        onClick={() => setOpen(prev => !prev)}
                        className="bg-blue-600 px-2 py-1 hover:bg-blue-800 rounded-sm text-sm text-white transition"
                    >
                        Create
                    </button>

                    <div className={`${open ? "block" : "hidden"} absolute z-30 translate-y-3 min-w-sm rounded-xl border border-gray-300 bg-white px-2 py-1 shadow-md`}>
                        <div className="flex gap-x-2 items-center rounded-md p-2 hover:bg-gray-200 cursor-pointer transition">
                            <img src={board} className="size-5" />
                            <div className="flex flex-col gap-y-0.5">
                                <h3 className="text-sm font-semibold text-black">Create board</h3>
                                <p className="text-xs text-gray-500">
                                    A board is made up of cards ordered on lists.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-x-2 items-center rounded-md p-2 hover:bg-gray-200 cursor-pointer transition">
                            <img src={dashboard} className="size-5" />
                            <div className="flex flex-col gap-y-0.5">
                                <h3 className="text-sm font-semibold text-black">Create workspace view</h3>
                                <p className="text-xs text-gray-500">
                                    Get perspective across multiple boards.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-x-2 items-center rounded-md p-2 hover:bg-gray-200 cursor-pointer transition">
                            <img src={template} className="size-5" />
                            <div className="flex flex-col gap-y-0.5">
                                <h3 className="text-sm font-semibold text-black">Start with a template</h3>
                                <p className="text-xs text-gray-500">
                                    Start a board with a template.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* right */}
            <div className='flex flex-row md:gap-x-4 gap-x-0.5'>
                <div className='relative group inline-block'>
                    <div className='w-9 h-9 flex items-center rounded-md justify-center cursor-point hover:bg-[#E4E6EA] transition '>
                        <img src={announcement} className='size-5 ' />
                    </div>
                    <p className='absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 px-2 py-1 text-[10px] rounded-md text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible '>share ur thoughts on Trello</p>
                </div>
                <div className='relative group inline-block'>
                    <div className='w-9 h-9 flex items-center rounded-md justify-center cursor-point hover:bg-[#E4E6EA] transition '>
                        <img src={notification} className='size-5  ' />
                    </div>
                    <p className='absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 px-2 py-1 text-[10px] rounded-md text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible '>Notifications</p>
                </div>
                <div className='relative group inline-block'>
                    <div className='w-10 h-9 flex items-center rounded-md justify-center cursor-point hover:bg-[#E4E6EA] transition '>
                        <img src={question} className='size-5 ' />
                    </div>
                    <p className='absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 px-2 py-1 text-[10px] rounded-md text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible '>Information</p>
                </div>
                <div className='relative group inline-block' ref={openRef}>
                    <div className='w-10 h-9 flex items-center rounded-md justify-center cursor-point hover:bg-[#E4E6EA] transition '
                        onClick={() => setUserOpen(prev=>!prev)}>
                        <div className='w-6 h-6 items-center justify-center flex rounded-full bg-violet-400'>
                            <p className='text-[10px]'>{initials}</p>
                        </div>
                    </div>
                    <p className='absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 px-2 py-1 text-[10px] rounded-md text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible '>Account</p>
                </div>
                {userOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-50">

                        <div className="px-4 py-3 border-b">
                            <p className="text-xs text-gray-500">ACCOUNT</p>
                            <p className="text-sm font-semibold mt-1">Manage your account</p>
                        </div>

                        <div className="px-4 py-2 text-sm hover:bg-[#E4E6EA] cursor-pointer">
                            Profile and visibility
                        </div>

                        <div className="px-4 py-2 text-sm hover:bg-[#E4E6EA] cursor-pointer">
                            Activity
                        </div>

                        <div className="px-4 py-2 text-sm hover:bg-[#E4E6EA] cursor-pointer"
                            onClick={() => navigate('/dashboard')}>
                            Cards
                        </div>

                        <div className="border-t my-1" />

                        <div className="px-4 py-2 text-sm hover:bg-[#E4E6EA] cursor-pointer"
                            onClick={() => navigate('/settings')}>
                            Settings
                        </div>

                        <div
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-red-600 hover:bg-[#E4E6EA] cursor-pointer"
                        >
                            Log out
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Navbar
