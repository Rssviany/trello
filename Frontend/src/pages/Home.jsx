import React from 'react'
import Navbar from '../components/Navbar'
import Inbox from '../components/Inbox'
import Board from '../components/Board'

function Home() {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex flex-1 gap-x-4 overflow-hidden">
          <Inbox />
          <Board />
        </div>
      </div>
    </>
  )
}

export default Home
