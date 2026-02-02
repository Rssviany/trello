import React from 'react'
import edit from '../assets/icons/edit.png'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function InboxCard({ card, setEditOpen, setCards }) {

    const handleComplete = async (card) => {
        setCards(prev =>
            prev.map(c =>
                c._id === card._id
                    ? { ...c, completed: true }
                    : c
            )
        )

        await fetch(`${BASE_URL}/inbox/items/${card._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ completed: true })
        })
    }

    return (
        <div
            key={card._id}
            className={`${card.completed ? "opacity-0 scale-95" : ""} w-[95%] bg-gray-100 relative group inline-block px-2 py-2 rounded-lg m-1 hover:border hover:border-blue-400`}
            onClick={() => setEditOpen(true)}
        >
            <div className='flex items-center justify-between'>
                <div className='flex items-center transition-all ease-in-out duration-300 overflow-hidden'>
                    <input
                        type="radio"
                        checked={card.completed}
                        onChange={() => handleComplete(card)}
                        className='size-3.5 accent-green-300 outline-none cursor-pointer absolute opacity-0 -translate-x-3 group-hover:translate-x-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out'
                    />

                    <p className='text-gray-500 text-sm font-serif px-1 py-1 group-hover:ml-5'>
                        {card.title}
                    </p>
                </div>

                <div className='flex items-center z-10'>
                    <img
                        src={edit}
                        className='size-6 cursor-pointer invisible opacity-0 group-hover:opacity-100 group-hover:visible'
                    />
                </div>
            </div>
        </div>
    )
}

export default InboxCard

