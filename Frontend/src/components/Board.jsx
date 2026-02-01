import { useDispatch, useSelector } from 'react-redux';
import BoardNavbar from './BoardNavbar'
import BoardMain from './BoardMain'
import { useEffect } from 'react';
import { fetchBoards } from '../redux/BoardSlice';
import React from 'react'


function Board() {
    const {boards,activeBoardId,loading}=useSelector(
      (state)=>state.boards
    );
    const dispatch=useDispatch();
    
    useEffect(()=>{
      dispatch(fetchBoards())
    },[dispatch]);

    const activeBoard=boards.find(
      (board)=>board._id=== activeBoardId
    )
    if (!activeBoard) return null;
  return (

    <>
        <div className='w-175  mr-4 flex-1'>
          <BoardNavbar board={activeBoard} />
          <BoardMain board={activeBoard} />
        </div>

    </>
  )
}

export default Board
