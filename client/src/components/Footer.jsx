// import React from 'react'
// import { BsRobot } from 'react-icons/bs'

// const Footer = () => {
//   return (
//     <footer className='bg-[#f3f3f3] px-6 py-12 flex justify-center'>
      
//       <div className='w-full max-w-6xl bg-white rounded-[28px] border border-gray-200 shadow-sm px-8 py-10'>

//         <div className='flex flex-col md:flex-row items-center justify-between gap-6'>

//           {/* Logo + Brand */}
//           <div className='flex items-center gap-3'>
//             <div className='bg-black text-white p-3 rounded-xl'>
//               <BsRobot size={18}/>
//             </div>

//             <h2 className='text-lg font-semibold tracking-wide'>
//               InterviewIQ.AI
//             </h2>
//           </div>

//           {/* Description */}
//           <p className='text-gray-500 text-sm text-center md:text-left max-w-md'>
//             AI powered interview platform to improve communication skills,
//             technical depth, and professional confidence through intelligent
//             mock interviews.
//           </p>

//         </div>

//         {/* Divider */}
//         <div className='border-t border-gray-200 my-8'></div>

//         {/* Bottom Section */}
//         <div className='flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500'>

//           <p>
//             © {new Date().getFullYear()} InterviewIQ.AI. All rights reserved.
//           </p>

//           <div className='flex items-center gap-6'>
//             <span className='hover:text-black cursor-pointer transition'>Privacy</span>
//             <span className='hover:text-black cursor-pointer transition'>Terms</span>
//             <span className='hover:text-black cursor-pointer transition'>Contact</span>
//           </div>

//         </div>

//       </div>

//     </footer>
//   )
// }

// export default Footer


// above code work properly


import React from 'react'
import { BsRobot } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className='bg-[#0f172a] px-6 py-12 flex justify-center'>
      
      <div className='w-full max-w-6xl bg-[#111827]/80 backdrop-blur-xl rounded-[28px] border border-gray-700 shadow-lg px-8 py-10'>

        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>

          {/* Logo + Brand */}
          <div className='flex items-center gap-3'>
            <div className='bg-gradient-to-r from-emerald-500 to-cyan-500 text-black p-3 rounded-xl shadow'>
              <BsRobot size={18}/>
            </div>

            <h2 className='text-lg font-semibold tracking-wide text-white'>
              InterviewIQ.AI
            </h2>
          </div>

          {/* Description */}
          <p className='text-gray-400 text-sm text-center md:text-left max-w-md'>
            AI powered interview platform to improve communication skills,
            technical depth, and professional confidence through intelligent
            mock interviews.
          </p>

        </div>

        {/* Divider */}
        <div className='border-t border-gray-700 my-8'></div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400'>

          <div className='text-center md:text-left'>
            <p>
              © {new Date().getFullYear()} InterviewIQ.AI. All rights reserved.
            </p>
            <p className='mt-1'>
              Made with <span className='text-red-500'>❤️</span> by Rajan Singh
            </p>
          </div>

          <div className='flex items-center gap-6'>
            <span className='hover:text-white cursor-pointer transition'>Privacy</span>
            <span className='hover:text-white cursor-pointer transition'>Terms</span>
            <span className='hover:text-white cursor-pointer transition'>Contact</span>
          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer