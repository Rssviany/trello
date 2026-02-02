import React, { useEffect, useState } from 'react'
import dots from '../assets/icons/dots.png'
import AddCards from './AddCards'
import { DndContext } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { arrayMove } from "@dnd-kit/sortable"
import InboxEditPanel from './InboxEditPanel'



const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function BoardCards({ boardId }) {
    const [cardsByList, setCardsByList] = useState({});
    const [activeListId, setActiveListId] = useState(null)
    const [listTitle, setListTitle] = useState('');
    const [list, setList] = useState([]);
    const [isAddingList, setIsAddingList] = useState(false);
    const [cardTitles, setCardTitles] = useState({});
    const [activeCard, setActiveCard] = useState(null)
    //Fetching Lists
    useEffect(() => {
        if (!boardId) return;
        const fetchLists = async () => {
            try {
                const res = await fetch(`${BASE_URL}/list/list_items?boardId=${boardId}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.json();
                setList(data);
            } catch (error) {
                console.log('error while fetching lists', error);
            }
        }
        fetchLists();
    }, [boardId]);
    //Fetching Cards
    useEffect(() => {
        if (!boardId) return;

        const fetchCards = async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/card/all_cards?boardId=${boardId}`,
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                );
                const data = await res.json();

                const grouped = {};

                data.forEach(card => {
                    const listId = card.list.toString();

                    if (!grouped[listId]) {
                        grouped[listId] = [];
                    }
                    grouped[listId].push(card);
                });

                setCardsByList(grouped);

            } catch (error) {
                console.log('Getting error while fetching the cards', error);
            }
        };

        fetchCards();
    }, [boardId]);

    //  Adding List
    const handleAddList = async (e) => {
        if (!listTitle.trim()) return
        try {
            const res = await fetch(`${BASE_URL}/list/creating_list`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: listTitle,
                    boardId: boardId
                })
            });
            const newList = await res.json();
            setList(prev => [...prev, newList]);
            setListTitle('')
            setIsAddingList(false);
        } catch (error) {
            console.log('Getting Error While Adding List', error)
        }
    }

    // Add Card
    const handleAddCard = async (listId) => {
        const title = cardTitles[listId]
        if (!title || !title.trim()) return;

        try {
            const res = await fetch(`${BASE_URL}/card/creating_card`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    boardId,
                    listId
                })
            });
            const newCard = await res.json()
            setCardsByList(prev => ({
                ...prev,
                [listId]: [...(prev[listId] || []), newCard],
            }));
            setCardTitles(prev => ({ ...prev, [listId]: "" }))
            setActiveListId(null)
        } catch (error) {
            console.log('Error adding card', error)
        }
    }
    //   Delete Card
    const handleDeleteCard = async (cardId) => {
        try {
            const res = await fetch(
                `${BASE_URL}/card/delete_card/${cardId}`,
                { method: 'DELETE', credentials: 'include' }
            );

            if (res.ok) {
                setCardsByList(prev => {
                    const updated = { ...prev };

                    for (const listId in updated) {
                        updated[listId] = updated[listId].filter(
                            card => card._id !== cardId
                        );
                    }

                    return updated;
                });
            }
        } catch (err) {
            console.error('Error deleting card', err);
        }
    };

    return (
        <>
            <div className="mt-2 flex flex-row gap-x-5 min-w-max items-start">
                {list.map((item) => (
                    <>
                        <div key={item._id} className='bg-[#F1F2F4] rounded-md w-65 h-fit shrink-0 px-2 py-2 shadow-2xl'>
                            <div className='flex justify-between  items-center'>
                                <h3 className='text-[#172B4D] text-sm font-semibold font-serif'>{item.title}</h3>
                                <div className='flex flex-row gap-x-2 items-center'>
                                    <div className='relative group flex'>
                                        <div className='w-7 h-7 hover:bg-black/20 items-center rounded-md flex justify-center'>
                                            <div className='flex flex-row gap-x-0.5'>
                                                <span className='text-sm text-gray-600'>→</span>
                                                <span className='text-sm text-gray-600'>←</span>
                                            </div>
                                        </div>
                                        <div className='absolute opacity-0 invisible rounded-md top-8 transition ease-in duration-500 cursor-pointer z-40  w-fit h-fit group-hover:opacity-100 group-hover:visible bg-black/85 whitespace-nowrap '>
                                            <span className='text-white text-[10px] px-1'>Collapse list /</span>
                                        </div>
                                    </div>
                                    <div className='relative group flex'>
                                        <div className='w-7 h-7 hover:bg-black/20 flex justify-center items-center rounded-md'>
                                            <img src={dots} alt="..." className='text-gray-700 size-4' />
                                        </div>
                                        <div className='absolute bg-black/85 top-8 px-1 rounded-md w-fit h-fit z-40 transition ease-in duration-500  opacity-0 invisible group-hover:opacity-100 group-hover:visible'>
                                            <span className='text-[10px] text-white whitespace-nowrap'>List actions</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {cardsByList[item._id]?.map(card => (
                                <AddCards card={card} key={card._id} onOpenCard={(card) => setActiveCard(card)} onDelete={handleDeleteCard} />
                            ))}
                            {activeCard && (
                                <InboxEditPanel
                                    card={activeCard}
                                    onClose={() => setActiveCard(null)}
                                />
                            )}

                            <div className=' w-[90%]  mt-2'>
                                {activeListId !== item._id && (
                                    <div onClick={() => setActiveListId(item._id)}
                                        className='bg-white rounded-md border border-[#DFE1E6] shadow-sm w-full cursor-pointer hover:shadow-md transition-shadow duration-150'>
                                        <div className='flex gap-x-3 items-center px-2 py-2'>
                                            <span className='text-[#172B4D] text-md'>+</span>
                                            <span className='text-[#172B4D] text-sm'>Add Card</span>
                                        </div>
                                    </div>
                                )}
                                {activeListId === item._id && (
                                    <div className='flex flex-col gap-y-2'>
                                        <textarea className='w-full h-fit  border-2 shadow-sm  hover:shadow-md px-1.5 py-1 hover:border-0 border-blue-400 text-sm text outline-none resize-none rounded-md text-gray-800 transition-all ease-in duration-150'
                                            placeholder='Enter a title or paste a link...' value={cardTitles[item._id] || ''}
                                            onChange={(e) => setCardTitles(prev => ({
                                                ...prev,
                                                [item._id]: e.target.value
                                            }))} />
                                        <div className='flex gap-x-2 items-center mt-2'>
                                            <button className='text-white bg-blue-600 rounded-md px-2 py-1 text-[12px] hover:bg-blue-800 ' onClick={() => handleAddCard(item._id)}>Add Card</button>
                                            <div className='hover:bg-black/15 rounded-md w-6 h-7 p-1 flex justify-center transition-all ease-in duration-500'>
                                                <button className='text-sm text-gray-600 transition-all ease-out duration-500 ' onClick={() => setActiveListId(null)}>✕</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ))}
                {!isAddingList && (
                    <div className="bg-black/5 hover:bg-black/10 p-2 w-65 h-fit shrink-0 rounded-md cursor-pointer flex items-center gap-x-2 transition-all ease-in-out duration-500 mr-2" onClick={() => setIsAddingList(true)}>
                        <span className='text-white'>+</span>
                        <span className='text-white text-sm'>Add another list...</span>
                    </div>
                )}

                {isAddingList && (
                    <div className="bg-[#F1F2F4] w-65 h-fit p-2  rounded-md mr-2">
                        <textarea className='w-[95%] h-8 border-2 border-blue-400 text-sm text-gray-800 font-semibold resize-none outline-none px-2 py-1'
                            placeholder='Enter a list name...' value={listTitle} onChange={(e) => setListTitle(e.target.value)} />
                        <div className='flex gap-x-2 items-center mt-2'>
                            <button className='text-white bg-blue-600 rounded-md px-2 py-1 text-sm hover:bg-blue-800 ' onClick={handleAddList}>Add list</button>
                            <div className='hover:bg-black/15 rounded-md w-6 h-7 p-1 flex justify-center transition-all ease-in duration-500'>
                                <button className='text-sm text-gray-600 transition-all ease-out duration-500 ' onClick={() => setIsAddingList(false)}>✕</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default BoardCards
