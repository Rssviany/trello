import React from 'react'
import BoardCards from './BoardCards'

function BoardMain({ board }) {
  if (!board) return null;

  const defaultBackground =
    'linear-gradient(135deg, #7a5aa6, #b76cc7, #e07bb7)';

  let backgroundStyle = defaultBackground;

  if (board.background) {
    if (board.background.type === 'gradient') {
      backgroundStyle = board.background.value;
    }

    if (board.background.type === 'image') {
      backgroundStyle = `url(${board.background.value}) center / cover no-repeat`;
    }
  }
  return (
    <div className='flex-1 overflow-x-auto relative overflow-y-hidden h-155 rounded-b-lg'
      style={{ background: backgroundStyle }}>
      <div className="flex gap-x-4 p-4  h-full min-w-max">
        <BoardCards boardId={board._id} />
      </div>
    </div>
  )
}

export default BoardMain
