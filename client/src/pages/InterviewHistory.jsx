





// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ServerUrl } from '../App'
// import { FaArrowLeft } from 'react-icons/fa'

// const InterviewHistory = () => {
//     const [interviews, setInterviews] = React.useState([])
//     const navigate =useNavigate()

//  useEffect(()=>{
//      const getMyInterviews = async()=>{
//         try {
//             const result = await axios.get(ServerUrl + "/api/interview/get-interview",{withCredentials:true})

//             // ✅ FIX: correct data access
//             setInterviews(result.data.interviews)

//             console.log("FULL RESPONSE:", result.data)
//             console.log("INTERVIEWS ARRAY:", result.data.interviews)

//         } catch (error) {
//             console.log(error)
//         }
//      }
//      getMyInterviews()
//  },[])

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-gray-50 to-emerald-5 py-10'>

//     <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>
//            <div className='mb-10 w-full flex items-start gap-4'>
//             <button
//             onClick={()=>navigate("/")}
//             className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'><FaArrowLeft className='text-gray-600'/></button>

//             <div>
//                 <h1 className='text-3xl font-bold flex-nowrap text-gray-800'>Interview History</h1>
//                 <p className='text-gray-500 mt-2'>Track your past interviews and performance reports</p>
//             </div>

//            </div>

//        {interviews.length === 0 ?
//          <div className='bg-white p-10 rounded-2xl shadow text-center'>
//             <p className='text-gray-500'>No interview found start your first interview.</p>

//          </div> :
//           <div className='grid gap-6'>


//           { interviews.map((item,index)=>(
//             <div
//             onClick={()=>navigate(`/report/${item._id}`)}
//             key={index}
//             className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100' >
//              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//                 <div>


//               <h3 className='text-xl font-semibold text-gray-800'>{item.role}</h3>

//               <p className='text-gray-500 text-sm mt-1'>{item.experience} * {item.mode}</p>

//                <p className='text-xs text-gray-400'>{new Date(item.createdAt).toLocaleDateString()}</p>

//                 </div>



//                 <div className='flex items-center gap-6'>

//                     <div className='text-right'>

//                         {/* ✅ FIX: ensure number */}
//                         <p className='text-xl font-bold text-emerald-600'>
//                           {item.finalScore ? item.finalScore : 0}/10
//                         </p>
                        
//                         <p className='text-xs text-gray-400'>Overall score</p>
//                     </div>


//                     <span className={`px-4 py-1 rounded-full text-xs font-medium ${item.status === "Completed"? "bg-emerald-100 text-emerald-700 " : 'bg-yellow-100 text-yellow-700 '}`}>
//                       {item.status}
//                     </span>
//                 </div>
//              </div>

//             </div>
//           ))}
            
//           </div>}
//     </div>
//     </div>
//   )
// }

// export default InterviewHistory

// above code work properly







import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServerUrl } from '../App'
import { FaArrowLeft, FaTrash } from 'react-icons/fa'
import { motion } from 'framer-motion'

const InterviewHistory = () => {
    const [interviews, setInterviews] = React.useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })

                setInterviews(result.data.interviews)

                console.log("FULL RESPONSE:", result.data)
                console.log("INTERVIEWS ARRAY:", result.data.interviews)

            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews()
    }, [])

    // ✅ NEW: Delete Interview Function
    const handleDelete = async (id, e) => {
        e.stopPropagation(); // card click na ho

        const confirmDelete = window.confirm("Are you sure you want to delete this interview?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${ServerUrl}/api/interview/delete/${id}`, {
                withCredentials: true
            });

            // UI update
            setInterviews(prev => prev.filter(item => item._id !== id));

        } catch (error) {
            console.log("Delete Error:", error);
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] py-12 px-4'>

            <div className='w-full max-w-6xl mx-auto'>

                {/* Header */}
                <div className='mb-12 flex items-start gap-4'>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-110 transition'>
                        <FaArrowLeft className='text-white' />
                    </button>

                    <div>
                        <h1 className='text-3xl md:text-4xl font-bold text-white'>Interview History</h1>
                        <p className='text-gray-400 mt-2'>Track your past interviews and performance insights</p>
                    </div>
                </div>

                {interviews.length === 0 ?
                    <div className='bg-white/10 backdrop-blur-lg p-12 rounded-3xl shadow-xl text-center border border-white/20'>
                        <p className='text-gray-300 text-lg'>No interviews found. Start your first interview 🚀</p>
                    </div>
                    :
                    <div className='grid gap-6'>

                        {interviews.map((item, index) => (
                            <motion.div
                                key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                whileHover={{ scale: 1.02 }}
                                className='relative bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/20 hover:border-emerald-400 transition-all duration-300 cursor-pointer'
                            >

                                {/* DELETE BUTTON */}
                                <button
                                    onClick={(e) => handleDelete(item._id, e)}
                                    className='absolute top-4 right-4 p-2 rounded-full bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white transition'
                                >
                                    <FaTrash size={14} />
                                </button>

                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>

                                    <div>
                                        <h3 className='text-xl font-semibold text-white'>{item.role}</h3>

                                        <p className='text-gray-400 text-sm mt-1'>
                                            {item.experience} • {item.mode}
                                        </p>

                                        <p className='text-xs text-gray-500 mt-1'>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-6'>

                                        <div className='text-right'>
                                            <p className='text-2xl font-bold text-emerald-400'>
                                                {item.finalScore ? item.finalScore : 0}/10
                                            </p>
                                            <p className='text-xs text-gray-400'>Overall score</p>
                                        </div>

                                        <span className={`px-4 py-1 rounded-full text-xs font-medium ${
                                            item.status === "Completed"
                                                ? "bg-emerald-500/20 text-emerald-400"
                                                : "bg-yellow-500/20 text-yellow-400"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>

                                </div>

                            </motion.div>
                        ))}

                    </div>
                }
            </div>
        </div>
    )
}

export default InterviewHistory