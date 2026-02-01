import React from 'react'
import downArrow from '../assets/icons/down-arrow.png'
import star from '../assets/icons/star.png'
import shuttle from '../assets/icons/shuttle.png'
import bolt from '../assets/icons/bolt.png'
import adduser from '../assets/icons/add-user.png'
import filter from '../assets/icons/filter.png'
import dots from '../assets/icons/dots.png'
import users from '../assets/icons/users.png'
import status from '../assets/icons/status.png'
import { useDispatch, useSelector } from 'react-redux'


function RightTrelloNav({ src, title, className = "" }) {
    return (
        <div className={`relative group flex ${className}`}>
            <div className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white">
                <img src={src} className="size-4.5" />
            </div>

            {title && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#242328] text-white text-[11px] px-2 py-1 rounded-md  opacity-0 group-hover:opacity-100 transition
            pointer-events-none whitespace-nowrap z-50">
                    {title}
                </div>
            )}
        </div>
    )
}



function BoardNavbar({ board }) {
    const dispatch = useDispatch();
    return (
        <div className="h-14 w-full rounded-t-lg shadow-sm bg-linear-to-l from-[#f4afd1] to-[#A855F7]">
            <div className="flex h-full items-center justify-between px-2 min-w-0 overflow-visible">

                {/* LEFT */}
                <div className="flex items-center gap-x-2 min-w-0">
                    <div className="max-w-40 truncate text-sm font-semibold text-white hover:bg-gray-600 px-2 h-7 flex items-center rounded-md">
                        {board ? board.title : 'My Trello Board'}
                    </div>

                    <div className="flex items-center gap-x-1 bg-white hover:bg-gray-300 h-7 px-2 rounded-md">
                        <img src={status} className="size-4" />
                        <img src={downArrow} className="size-4" />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-x-1 min-w-0 overflow-visible">
                    <RightTrelloNav src={shuttle} title="Power ups" className="hidden lg:flex" />
                    <RightTrelloNav src={bolt} title="Automation" className="hidden lg:flex" />

                    <RightTrelloNav src={filter} title="Filters" className="hidden md:flex" />
                    <RightTrelloNav src={star} title="Star this board" className="hidden md:flex" />

                    <RightTrelloNav src={users} title="Change visibility" className="hidden sm:flex" />

                    <RightTrelloNav src={adduser} title="Invite" />
                    <RightTrelloNav src={dots} title="More options" />

                </div>

            </div>
        </div>
    )
}

export default BoardNavbar
