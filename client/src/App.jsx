// import React, { useEffect } from 'react'
// import { Routes,Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Auth from './pages/Auth'
// import { linkWithCredential } from 'firebase/auth'
// import axios from 'axios'

// export const ServerUrl = " http://localhost:8000"

// const App = () => {
//   useEffect(()=>{
//  const getUser = async () => {
//   try {
//     const result = await axios.get(ServerUrl + "/api/user/current-user",{WithCredential:true})
//     console.log(result.data)
//   } catch (error) {
//     console.log(error)
//   }
  
//  }
// getUser()
//   },[])
//   return (
//    <>
//    <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/auth" element={<Auth />} />
//    </Routes>
//    </>
//   )
// }

// export default App



import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import {useDispatch} from "react-redux"
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'

export const ServerUrl = "http://localhost:8000"

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    const getUser = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/user/current-user",
          { withCredentials: true }   // ✅ correct
        )
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error.response?.data || error.message)
        dispatch(setUserData(null))
      }
    }

    getUser()

  },[dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/interview" element={<InterviewPage />} />
            <Route path="/history" element={<InterviewHistory />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/report/:id" element={<InterviewReport />} />
      </Routes>
    </>
  )
}

export default App