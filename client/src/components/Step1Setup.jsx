





import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import axios from "axios"
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from 'react-icons/fa'
import { setUserData } from '../redux/userSlice'

const Step1Setup = ({ onStart }) => {

  const ServerUrl = import.meta.env.VITE_SERVER_URL;

  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [mode, setMode] = useState("Technical");
  const [role, setRole] = useState("")
  const [experience, setExperience] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [resumeText, setResumeText] = useState("")
  const [analysisDone, setAnalysisDone] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;

    setAnalyzing(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    console.log("FormData resume:", formData.get("resume"));


    try {
      const result = await axios.post(
        `${ServerUrl}/api/interview/resume`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      console.log("SERVER RESPONSE:", result.data);

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);

    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);

    try {
      const result = await axios.post(
        `${ServerUrl}/api/interview/generate-questions`,
        {
          role,
          experience,
          mode,
          resumeText,
          projects,
          skills,
        },
        { withCredentials: true }
      );

      console.log(result.data)

      if (userData) {
        dispatch(setUserData({
          ...userData,
          credits: result.data.creditsLeft
        }))
      }

      onStart(result.data);

    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4'
    >

      <div className='w-full max-w-6xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='relative bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-12 flex flex-col justify-center backdrop-blur-lg'
        >
          <h2 className='text-3xl font-bold text-white mb-6'>Start your AI Interview</h2>

          <p className='text-gray-300 mb-10'>
            Practice real interview questions, get instant feedback, and boost your confidence for your next job interview.
          </p>

          <div className='space-y-5'>
            {
              [
                {
                  icon: <FaUserTie className='text-emerald-400 text-xl' />,
                  text: "Choose role and Experience"
                },
                {
                  icon: <FaMicrophoneAlt className='text-cyan-400 text-xl' />,
                  text: "Smart voice Interview"
                },
                {
                  icon: <FaChartLine className='text-purple-400 text-xl' />,
                  text: "Performance Analytics"
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  whileHover={{ scale: 1.05 }}
                  className='flex items-center space-x-4 bg-white/10 border border-white/20 p-4 rounded-xl shadow-md cursor-pointer hover:bg-white/20 transition'
                >
                  {item.icon}
                  <span className='text-white font-medium'>{item.text}</span>
                </motion.div>
              ))
            }
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='p-12 bg-white'
        >

          <h2 className='text-3xl font-bold text-gray-800 mb-8'>Interview Setup</h2>

          <div className='space-y-6'>

            <div className='relative'>
              <FaUserTie className='absolute top-4 left-4 text-gray-400' />
              <input
                type='text'
                placeholder='Enter your role'
                className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm'
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>

            <div className='relative'>
              <FaBriefcase className='absolute top-4 left-4 text-gray-400' />
              <input
                type='text'
                placeholder='Enter your experience'
                className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm'
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>

            <select
              onChange={(e) => setMode(e.target.value)}
              value={mode}
              className='w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm'
            >
              <option value="">Select Interview Type</option>
              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
            </select>

            {!analysisDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className='border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition min-h-[140px] flex items-center justify-center'
              >
                <div className='flex flex-col items-center space-y-2 text-gray-500'>

                  <FaFileUpload className='text-4xl text-emerald-500 mb-3' />

                  <input
                    type="file"
                    accept='application/pdf'
                    id='resumeUpload'
                    className='hidden'
                    onChange={(e) => setResumeFile(e.target.files[0])}
                  />

                  <p className='text-gray-600 font-medium'>
                    {resumeFile ? resumeFile.name : "Upload your resume (PDF only)"}
                  </p>

             {resumeFile && (
  <motion.button
    onClick={(e) => {
      e.stopPropagation();   // ✅ FIX ADDED
      handleUploadResume();
    }}
    whileHover={{ scale: 1.05 }}
    className='mt-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2 rounded-full shadow-lg'
  >
    {analyzing ? "Analyzing..." : "Analyse Resume"}
  </motion.button>
)}

                </div>
              </motion.div>
            )}

            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-gradient-to-br from-emerald-50 to-cyan-50 border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm'
              >

                <h3 className='text-lg font-semibold text-gray-800'>Resume Analysis Result</h3>

                {projects.length > 0 && (
                  <div>
                    <p className='font-medium text-gray-700 mb-1'>Projects:</p>
                    <ul className='list-disc list-inside text-gray-600 space-y-1'>
                      {projects.map((proj, index) => <li key={index}>{proj}</li>)}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className='font-medium text-gray-700 mb-1'>Skills:</p>
                    <div className='flex flex-wrap gap-2'>
                      {skills.map((skill, index) => (
                        <span key={index} className='bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm'>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            )}

            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || !mode || !resumeText || loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='w-full disabled:bg-gray-400 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 text-white py-3 rounded-full text-lg font-semibold shadow-lg'
            >
              {loading ? "Starting..." : "Start Interview"}
            </motion.button>

          </div>

        </motion.div>

      </div>

    </motion.div>
  )
}

export default Step1Setup








