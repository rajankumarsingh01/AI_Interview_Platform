import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import Step3Report from '../components/Step3Report'

const InterviewReport = () => {

  const { id } = useParams()

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchReport = async () => {
      try {
        setLoading(true)

        const result = await axios.get(
          `${ServerUrl}/api/interview/report/${id}`,
          { withCredentials: true }
        )

        console.log("REPORT DATA:", result.data)

        setReport(result.data)

      } catch (err) {
        console.error("Error fetching report:", err)
        setError("Failed to load report. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchReport()
    }

  }, [id])

  // ✅ Loading UI
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500 text-lg animate-pulse'>
          Loading Report...
        </p>
      </div>
    )
  }

  // ✅ Error UI
  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-red-500 text-lg'>
          {error}
        </p>
      </div>
    )
  }

  // ✅ Safety check
  if (!report) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500 text-lg'>
          No report found
        </p>
      </div>
    )
  }

  // ✅ Final Render
  return <Step3Report report={report} />
}

export default InterviewReport