import React, { useEffect, useState } from 'react';
import edit from '../assets/icons/edit.png';
import pencil from '../assets/icons/pencil.png';
import copy from '../assets/icons/copy.png';
import covers from '../assets/icons/covers.png';
import share from '../assets/icons/share.png';
import trash from '../assets/icons/trash.png';
import description from '../assets/icons/description.png';
import users from '../assets/icons/users.png';
import rightarrow from '../assets/icons/rightarrow.png';


function EditOptions({ src, title, onClick }) {
    return (
        <div
            onClick={onClick}
            className='bg-[#E4E6EA] relative  w-fit items-center cursor-pointer h-fit px-2 py-2 rounded-md hover:bg-[#DADBE2] flex gap-x-2'
        >
            <img src={src} className='size-4.5' alt={title} />
            <span className='text-black/80 text-[12px] font-semibold'>{title}</span>
        </div>
    );
}



export default function AddCards({ card, onOpenCard, onDelete }) {
    const [openPanel, setOpenPanel] = useState(null);
    const [isRadioFill, setIsRadioFill] = useState(false);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [savedCover, setSavedCover] = useState(null);
    const [tempCover, setTempCover] = useState(null);
    const [coverChange, setCoverChange] = useState(null);
    const [labelColors] = useState([
        '#8b5cf6', // violet
        '#3b82f6', // blue
        '#22c55e', // green
        '#6366f1', // indigo
        '#eab308', // yellow
        '#f97316', // orange
        '#ef4444'  // red
    ]);
    useEffect(() => {
        const close = () => setOpenPanel(null)
        window.addEventListener('click', close)
        return () => window.removeEventListener('click', close)
    }, [])
    useEffect(() => {
        const saved = localStorage.getItem(`card-labels-${card._id}`);
        if (saved) {
            setSelectedLabels(JSON.parse(saved));
        }
    }, [card._id]);
    useEffect(() => {
        const saved = localStorage.getItem(`card-cover-${card._id}`);
        if (saved) {
            setSavedCover(saved);
        }
    }, [card._id]);

    return (
        <>
            <div
                key={card._id}
                className={`relative ${openPanel === 'label' ? '[transform-translateZ(300px)]   scale-110 border-2! border-blue-500!' : 'scale-100'}
             ${openPanel ? 'z-50' : 'z-10'}   
              bg-white  group inline-block [transform-3d] px-2 py-2 rounded-lg border-white border-2 m-1 hover:border-blue-400 hover:shadow-xl w-[95%] transition-all`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col space-y-2 items-start w-full'>
                        {/* Changing Covers */}
                        {(savedCover || tempCover) && (
                            <div className="relative w-57 overflow-hidden -mx-2 -my-2">
                                <div
                                    className="w-full h-8 rounded-t-md"
                                    style={{ backgroundColor: tempCover || savedCover }}
                                />
                            </div>
                        )}

                        {/* setting Labels */}
                        {selectedLabels.length > 0 && (
                            <div className={`flex flex-wrap gap-1 mb-1 max-w-full `}>
                                {selectedLabels.map((color, idx) => (
                                    <span
                                        key={idx}
                                        className={`w-8 h-2 rounded-sm ${tempCover || savedCover ? 'translate-y-3' : ''}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        )}

                        <div className='flex items-center  transition-all ease-in-out duration-300'>

                            {isRadioFill ? (
                                <div className='relative group/mark flex'>
                                    <div
                                        className='w-4 h-4 rounded-full border border-white bg-green-700 cursor-pointer relative transition-all'
                                        onClick={() => setIsRadioFill(false)}
                                    >
                                        <span className='text-white font-semibold absolute left-1 text-[10px]'>✓</span>
                                        <div className='-top-6 left-2 absolute bg-black/85 rounded-md opacity-0 invisible group-hover/mark:opacity-100 group-hover/mark:visible w-22 h-5 flex items-center px-1 whitespace-nowrap transition-all z-30'>
                                            <span className='text-white text-[10px]'>Mark Incomplete</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='relative group/mark flex'>
                                    <input
                                        type='radio'
                                        checked={false}
                                        onClick={() => setIsRadioFill(true)}
                                        className='size-3.5 accent-green-300 outline-none cursor-pointer absolute -top-1.5 opacity-0 -translate-x-3 group-hover:translate-x-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in'
                                    />
                                    <div className='-top-6 left-2 absolute bg-black/85 rounded-md opacity-0 invisible group-hover/mark:opacity-100 group-hover/mark:visible w-20 h-5 flex items-center px-1 whitespace-nowrap transition-all z-30'>
                                        <span className='text-white text-[10px]'>Mark Complete</span>
                                    </div>
                                </div>
                            )}

                            <p
                                className={`${tempCover || savedCover ? 'mt-2' : ''} text-gray-500 text-sm font-serif px-1 py-1 transition ease-in duration-500 wrap-break-word overflow-visible ${isRadioFill ? '' : 'group-hover:translate-x-4'
                                    }`}
                                style={{
                                    whiteSpace: 'normal',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 5,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxHeight: '7.5rem'
                                }}>
                                {card.title}
                            </p>
                        </div>
                    </div>

                    {/* EDIT ICON */}
                    <div className={`shrink-0 self-start mt-1 flex items-center justify-center z-20 relative w-8 ${tempCover || savedCover ? '-translate-x-4 -translate-y-2 mb-2' : ''}`}>

                        <img
                            src={edit}
                            onClick={() => {
                                setOpenPanel(prev =>
                                    prev === 'edit' ? null : 'edit'
                                );
                            }}
                            className='size-6 cursor-pointer opacity-0 group-hover:opacity-100'
                            alt="Edit"
                        />
                    </div>

                    {/* EDIT MENU */}
                    {openPanel === 'edit' && (
                        <div className='flex flex-col z-50  gap-y-2 absolute -right-25 top-6'>
                            <EditOptions
                                src={description}
                                title='Open Card'
                                onClick={() => {
                                    onOpenCard(card);
                                    setOpenPanel(null);
                                }}
                            />
                            {/* Open Labels */}
                            <EditOptions src={pencil} title='Edit Labels'
                                onClick={() => {
                                    setOpenPanel(prev =>
                                        prev === 'label' ? null : 'label'
                                    );
                                }} />

                            <EditOptions src={users} title='Change Members' />
                            <EditOptions src={covers} title='Change Covers'
                                onClick={() => {
                                    setOpenPanel(prev =>
                                        prev === 'coverChange' ? null : 'coverChange'
                                    )
                                }} />
                            <EditOptions src={rightarrow} title='Move' />
                            <EditOptions src={copy} title='Copy Card' />
                            <EditOptions src={share} title='Copy Link' />
                            <EditOptions src={trash} title='Delete Card' onClick={() => onDelete(card._id)} />
                        </div>
                    )}

                </div>
                {/* Label panel */}
                {openPanel === 'label' && (
                    <>
                        <div className=' rounded-md w-60 bg-white   z-50 h-fit px-2 left-20 absolute  space-y-3 py-2 shadow-2xl transition-all ease-in duration-300'>
                            <div className='flex items-center justify-between'>
                                <span className='text-black/40 text-[14px]'>Labels</span>
                                <div className='flex justify-center items-center p-1 cursor-pointer hover:bg-gray-400 w-5 h-5 rounded-md'>
                                    <span className='text-black/60 text-sm' onClick={() => setOpenPanel(null)}>x</span>
                                </div>
                            </div>
                            <input type="text" className='w-[90%] h-7  border-2 border-blue-500 px-2 py-1 outline-none text-gray-600 text-[13px]' placeholder='Search Labels...' />
                            {labelColors.map((color, index) => (
                                <div key={index} className='flex gap-x-2 items-center'>
                                    <input type="checkbox" className='size-3 outline-none' checked={selectedLabels.includes(color)}
                                        onChange={() => {
                                            setSelectedLabels(prev =>
                                                prev.includes(color)
                                                    ? prev.filter(c => c !== color)
                                                    : [...prev, color]
                                            )
                                        }} />
                                    <span className={`w-[80%] rounded-sm h-5`} style={{ backgroundColor: color }}></span>
                                    <div className='hover:bg-gray-300 flex justify-center rounded-md p-1'>
                                        <img src={pencil} alt="pencil" className='size-3 ' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {openPanel === 'coverChange' && (
                    <div className='rounded-md space-y-2 items-center w-60 absolute px-2 left-20 z-50 bg-white'>
                        <div className=' flex flex-row justify-between  mt-2'>
                            <span className='text-black/75 text-[12px] font-semibold '>Covers</span>
                            <div className='hover:bg-gray-100 w-5 h-5 rounded-md flex justify-center p-1'>
                                <span className='text-[12px] text-balck/60 transition-all ease-in duration-500 cursor-pointer' onClick={() => setOpenPanel(null)}>X</span>
                            </div>
                        </div>
                        <p className='text-black font-semibold text-[13px] '>Colors</p>
                        <div className=' flex flex-row flex-wrap items-center w-max-full gap-x-2 space-y-1'>
                            {labelColors.map((color, idx) => (

                                <span className='w-17 h-8 rounded-sm flex flex-row' style={{ backgroundColor: color }} onClick={() => setTempCover(color)} ></span>

                            ))}
                        </div>
                        <div className='bg-gray-300 hover:bg-gray-200 cursor-pointer rounded-md w-full flex justify-center mb-2'>
                            <span className='text-black/65 text-sm py-1 font-semibold' onClick={() => setSavedCover(null)}>Remove Color</span>
                        </div>
                    </div>
                )}
            </div>
            {/* Save btn for labels */}
            {(openPanel === 'label' || openPanel === 'coverChange') && (
                <div className="mt-3 flex justify-start transform-3d [transform-translateZ(300px)] scale-110 -translate-y-1 translate-x-2">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-2 py-1.5 rounded-md"
                        onClick={() => {
                            if (openPanel === 'label') {
                                localStorage.setItem(
                                    `card-labels-${card._id}`,
                                    JSON.stringify(selectedLabels)
                                );
                            }

                            if (openPanel === 'coverChange') {
                                if (tempCover) {
                                    localStorage.setItem(
                                        `card-cover-${card._id}`,
                                        tempCover
                                    );
                                    setSavedCover(tempCover);
                                }
                                setTempCover(null);
                            }

                            setOpenPanel(null);
                        }}>
                        Save
                    </button>
                </div>
            )}
        </>
    );
}


