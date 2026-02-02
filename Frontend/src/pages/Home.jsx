import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Inbox from '../components/Inbox'
import Board from '../components/Board'
import BottomBar from '../components/BottomBar'

function Home() {
  const [showInbox, setShowInbox] = useState(false)
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden relative">
        <Navbar />

        <div className="flex flex-1 gap-x-4 ">
          <div
            className={`
            transition-all duration-1000 ease-in-out
            ${showInbox ? "w-70 translate-x-0 h-full" : "w-0 -translate-x-full"}
          `}
          >
            {showInbox &&<Inbox />}
          </div>

          <Board />
        </div>
        <div className='absolute bottom-4 left-0 w-full  flex justify-center  '>
          <div>
          <BottomBar showInbox={showInbox} setShowInbox={setShowInbox} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Inbox from "../components/Inbox";
// import Board from "../components/Board";
// import BottomBar from "../components/BottomBar";

// function Home() {
//   const [showInbox, setShowInbox] = useState(false);
//   const [active, setActive] = useState(null);

//   return (
//     <div className="h-screen flex flex-col overflow-hidden relative">
//       <Navbar />
//       <div className="flex flex-1 gap-x-4 overflow-hidden">
//         <div
//           className={`
//             transition-all duration-300 ease-out
//             ${showInbox ? "w-70 translate-x-0 h-full" : "w-0 -translate-x-full"}
//           `}
//         >
//           {showInbox && <Inbox />}
//         </div>
//           <Board />
//       </div>

//       {/* Bottom Bar */}
//       <div className="absolute bottom-4 left-0 w-full flex justify-center pointer-events-none">
//         <div className="pointer-events-auto">
//           <BottomBar
//             showInbox={showInbox}
//             setShowInbox={setShowInbox}
//             active={active}
//             setActive={setActive}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;



