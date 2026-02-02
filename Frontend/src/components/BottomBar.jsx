import React from "react";
import inbox from "../assets/icons/inbox.png";
import board from "../assets/icons/board.png";
import copy from "../assets/icons/copy.png";
import { useNavigate } from "react-router-dom";

function BottomBar({ showInbox, setShowInbox,  }) {
    const navigate = useNavigate();
    const handleInbox = () => {
        setShowInbox(prev => !prev);
       
    };
    return (
        <div className=" mb-2 w-fit   bg-gray-50 rounded-md  -translate-y-9 shadow-2xl px-1 z-30 ">
            <div className="flex flex-row items-center gap-x-2 px-1 py-1">
                <Items src={inbox} title='Inbox' 
                    onClick={handleInbox}
                />
                <Items src={board} title='Board'  />
                <Items src={copy} title='Switch Boards'  onClick={() => navigate('/dashboard')} />
            </div>
        </div>
    );
}

export default BottomBar;
function Items({ src, title, onClick,  }) {
    return (
        <div className={`hover:bg-blue-300   rounded-md px-3 py-1 flex items-center cursor-pointer transition-colors duration-200`}
            onClick={onClick}>
            <div className="flex flex-row gap-x-2 items-center relative px-2 py-1">
                <img src={src} alt={title} className="size-4" />
                <span className="text-sm text-black/80 font-semibold">{title}</span>
            </div>
            
        </div>
    )
}

