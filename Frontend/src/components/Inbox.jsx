import React, { useEffect, useState } from 'react'
import inbox from '../assets/icons/inbox.png'
import dots from '../assets/icons/dots.png'
import filter from '../assets/icons/filter.png'
import announcement from '../assets/icons/announcement.png'
import InboxCard from './InboxCard'

function Inbox() {
    const [cardOpen, setCardOpen] = useState(false)
    const [cards, setCards] = useState([])
    const [text, setText] = useState('')
    const [editOpen, setEditOpen] = useState(false)

    const handleAddCard = async () => {
        if (!text.trim()) return

        const tempId = Date.now()

        // optimistic UI
        setCards(prev => [
            ...prev,
            {
                _id: tempId,
                title: text,
                completed: false
            }
        ])

        setText('')

        try {
            const res = await fetch(
                "https://trello-backend-izq1.onrender.com/inbox/items_creating",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ title: text })
                }
            )

            const saved = await res.json()

            setCards(prev =>
                prev.map(card =>
                    card._id === tempId ? saved : card
                )
            )
        } catch (err) {
            setCards(prev =>
                prev.filter(card => card._id !== tempId)
            )
        }
    }

    useEffect(() => {
        const loadCards = async () => {
            const res = await fetch(
                "https://trello-backend-izq1.onrender.com/inbox/items",
                { credentials: "include" }
            )
            const data = await res.json()
            setCards(data)
        }

        loadCards()
    }, [])

    return (
        <div className='w-70 shrink-0 h-170 border-2 border-gray-200  rounded-2xl ml-2 mb-1 overflow-hidden'>
            <div className='relative group inline-block w-full'>
                {/* Header */}
                <div className='bg-[#eaeffb] w-70 h-15 rounded-tr-2xl rounded-tl-2xl flex items-center px-4'>
                    <div className='flex flex-row justify-between w-full'>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <img src={inbox} className='size-4' />
                            <p className='text-sm text-[#37393b] font-bold'>Inbox</p>
                        </div>

                        <div className='absolute left-45 invisible group-hover:visible group-hover:opacity-100 flex gap-x-2 transition-all duration-200'>
                            <img src={announcement} className='size-5' />
                            <img src={filter} className='size-5' />
                            <img src={dots} className='size-5' />
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className='bg-[#d8e1f8] h-full'>
                    <textarea
                        className={`mx-1 mt-1 w-[95%] ${cardOpen ? 'bg-white' : 'hover:bg-gray-200'} text-sm font-mono outline-0 px-1 py-1 border shadow-2xl border-[#DFE1E6] rounded-t-xl`}
                        placeholder={cardOpen ? 'Enter title' : 'Add a Card'}
                        onFocus={() => setCardOpen(true)}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    {cardOpen && (
                        <div className='w-[95%] bg-gray-100 rounded-b-lg items-center px-2 py-1.5 flex gap-x-2 mx-1 -translate-y-1.5'>
                            <button
                                className='bg-blue-600 text-white text-[12px] p-1 rounded-md'
                                onClick={handleAddCard}
                            >
                                Add Card
                            </button>

                            <div
                                className='hover:bg-gray-300 w-12 h-6 rounded-xs cursor-pointer'
                                onClick={() => setCardOpen(false)}
                            >
                                <p className='text-sm'>Cancel</p>
                            </div>
                        </div>
                    )}

                    {cards
                        .filter(card => !card.completed)
                        .map(card => (
                            <InboxCard
                                key={card._id}
                                card={card}
                                setEditOpen={setEditOpen}
                                setCards={setCards}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Inbox

