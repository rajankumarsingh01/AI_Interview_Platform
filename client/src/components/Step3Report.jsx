// import React from 'react'
// import { FaArrowLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion'
// import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const Step3Report = ({ report }) => {
//   if (!report) {
//     return (
//       <div className='min-h-screen flex items-center justify-center'>
//         <p className='text-gray-500 text-lg'>Loading Report</p>
//       </div>
//     )
//   }

//   const navigate = useNavigate()

//   const {
//     finalScore = 0,
//     confidence = 0,
//     communication = 0,
//     correctness = 0,
//     questionWiseScore = [],
//   } = report;

//   const questionScoreData = questionWiseScore.map((score, index) => ({
//     name: `Q${index + 1}`,
//     score: score.score || 0
//   }))

//   const skills = [
//     { label: "Confidence", value: confidence },
//     { label: "Communication", value: communication },
//     { label: "Correctness", value: correctness }
//   ];

//   let performanceText = "";
//   let shortTagline = "";

//   if (finalScore >= 8) {
//     performanceText = "Ready for job opportunities";
//     shortTagline = "Excellent performance! You're well-prepared for job opportunities.";
//   } else if (finalScore >= 5) {
//     performanceText = "need minor improvement";
//     shortTagline = "Good effort! With some improvement, you'll be ready for job opportunities.";
//   } else {
//     performanceText = "need significant improvement";
//     shortTagline = "Don't be discouraged! Focus on improving your skills, and you'll get there.";
//   }

//   const score = finalScore;
//   const percentage = (score / 10) * 100;


//   const downloadPDF = ()=>{
//     const doc = new jsPDF("p","mm","a4");
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const margin = 20;
//     const contentWidth = pageWidth - 2 * margin;

//     let currentY = 25;

//     // title
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(20);
//     doc.setTextColor(34,197,94);
//     doc.text("Interview Analytics Report", pageWidth/2, currentY, {align:"center"});

//     currentY += 5;

//     // underline
//     doc.setDrawColor(34,197,94);
//     doc.line(margin, currentY, pageWidth - margin, currentY);
//     currentY += 15;

//     // final score
//     doc.setFillColor(240,253,244);
//     doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

//     doc.setFontSize(14)
//     doc.setTextColor(0,0,0)
//     doc.text(`Final Score: ${finalScore}/10`, pageWidth/2, currentY + 12, {align:"center"})

//     currentY += 30;

//     // skills box
//     doc.setFillColor(249,250,251);
//     doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

//     doc.setFontSize(12);
//     doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 12);
//     doc.text(`Communication: ${communication}`, margin + 10, currentY + 22);
//     doc.text(`Correctness: ${correctness}`, margin + contentWidth/2 + 10, currentY + 12); 

//     currentY += 45;

//     // advice
//     let advice = "";
//     if(finalScore >= 8){
//       advice = "Excellent performance! You're well-prepared for job opportunities.";
//     }else if(finalScore >= 5){
//       advice = "Good effort! With some improvement, you'll be ready for job opportunities.";
//     }else {
//       advice = "Don't be discouraged! Focus on improving your skills, and you'll get there.";
//     }

//     doc.setFillColor(255,255,255);
//     doc.setDrawColor(220);
//     doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "FD");

//     doc.setFont("helvetica", "bold");
//     doc.text("Performance Summary:", margin + 10, currentY + 10);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(11);

//     const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
//     doc.text(splitAdvice, margin + 10, currentY + 20);

//     currentY += 50;

//     // question table
//     autoTable(doc,{
//       startY: currentY,
//       margin: { left: margin, right: margin },
//       head: [["Question", "Score", "AI Feedback"]],
//       body: questionWiseScore.map((q, i) => [
//         q.question || "Question not available",
//         `${q.score ?? 0}/10`,
//         q.feedback || "No feedback available"
//       ]),
//       styles:{
//         fontSize:9,
//         cellPadding:5,
//         valign:"top",
//       },
//       headStyles:{
//         fillColor:[34,197,94],
//         textColor:255,
//         halign:"center",
//       },
//       columnStyles:{
//         0:{cellWidth:80},
//         1:{cellWidth:25, halign:"center"},
//         2:{cellWidth:"auto"}
//       },
//       alternateRowStyles:{
//         fillColor:[249,250,251]
//       },
//     });

//     doc.save("AI_interview_Report.pdf");
//   }

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-gray-50 to-green-50 px-4 sm:px-6 lg:px-10 py-8'>
//       <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
//         <div className='md:mb-10 w-full flex items-start gap-4 flex-wrap'>
//           <button
//             onClick={() => navigate("/history")}
//             className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
//             <FaArrowLeft className='text-gray-600' />
//           </button>

//           <div>
//             <h1 className='text-3xl font-bold flex-nowrap text-gray-800'>Interview Analytics Dashboard</h1>
//             <p className='text-gray-500 mt-2'>Ai-powered interview analysis and performance insights</p>
//           </div>
//         </div>

//         <button 
//         onClick={downloadPDF}
//         className='bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base whitespace-nowrap'>
//           Download Pdf
//         </button>
//       </div>

//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
//         <div className='space-y-6'>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center' >

//             <h3 className='text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base'>Overall Performance</h3>

//             <div className='relative w-20 h-20 sm:w-24 sm:h-24 mx-auto'>
//               <CircularProgressbar
//                 value={percentage}
//                 text={`${score}/10`}
//                 styles={buildStyles({
//                   textSize: "18px",
//                   pathColor: "#10b981",
//                   textColor: "#111827",
//                   trailColor: "#e5e7eb",
//                 })}
//               />
//             </div>

//             <div className='mt-4'>
//               <p className='font-semibold text-gray-800 text-sm sm:text-base'>{performanceText}</p>
//               <p className='text-gray-500 text-xs sm:text-sm mt-1'>{shortTagline}</p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8'>

//             <h3 className='text-base sm:text-lg font-semibold text-gray-700 mb-6'>Skill Evaluation</h3>

//             <div className='space-y-5'>
//               {
//                 skills.map((s, i) => (
//                   <div key={i}>
//                     <div className='flex justify-between mb-2 text-sm sm:text-base'>
//                       <span>{s.label}</span>
//                       <span className='font-semibold text-green-600'>{s.value}/10</span>
//                     </div>

//                     <div className='bg-gray-200 h-2 sm:h-3 rounded-full'>
//                       <div
//                         className='bg-green-500 h-full rounded-full'
//                         style={{ width: `${s.value * 10}%` }}
//                       />
//                     </div>
//                   </div>
//                 ))
//               }
//             </div>

//           </motion.div>
//         </div>

//         <div className='lg:col-span-2 space-y-6'>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'>

//             <h3 className='text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6'>Performance Trend</h3>

//             <div className='h-64 sm:h-72'>
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={questionScoreData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis domain={[0, 10]} />
//                   <Tooltip />
//                   <Area
//                     type="monotone"
//                     dataKey="score"
//                     stroke="#10b981"
//                     fill="#10b981"
//                     strokeWidth={3}
//                     fillOpacity={0.3}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>

//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'
//           >

//             <h3 className='text-base sm:text-lg font-semibold text-gray-700 mb-6'>
//               Question Breakdown
//             </h3>

//             <div className='space-y-6'>
//               {
//                 questionWiseScore.map((q, i) => (
//                   <div key={i} className='bg-gray-50 p-4 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-200'>
                    
//                     <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>

//                       <div>
//                         <p className='text-xs text-gray-400'>Question {i + 1}</p>

//                         <p className='font-semibold text-gray-800 text-sm sm:text-base leading-relaxed'>
//                           {q.question || "Question not available"}
//                         </p>
//                       </div>

//                       <div className='bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs sm:text-sm w-fit'>
//                         {q.score ?? 0}/10
//                       </div>

//                     </div>

//                     <div className='bg-green-50 border border-green-200 p-4 rounded-lg'>

//                       <p className='text-xs text-green-600 font-semibold mb-1'>AI Feedback</p>
//                       <p className='text-sm text-gray-600 leading-relaxed'>
//                         {q.feedback && q.feedback.trim() !== "" ? q.feedback : "no feedback available for this questions"}
//                       </p>

//                     </div>


//                   </div>
//                 ))
//               }
//             </div>

//           </motion.div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Step3Report



// above code work properly








import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Step3Report = ({ report }) => {
  if (!report) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black'>
        <p className='text-gray-300 text-lg'>Loading Report</p>
      </div>
    )
  }

  const navigate = useNavigate()

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness }
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities";
    shortTagline = "Excellent performance! You're well-prepared for job opportunities.";
  } else if (finalScore >= 5) {
    performanceText = "need minor improvement";
    shortTagline = "Good effort! With some improvement, you'll be ready for job opportunities.";
  } else {
    performanceText = "need significant improvement";
    shortTagline = "Don't be discouraged! Focus on improving your skills, and you'll get there.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;


  const downloadPDF = ()=>{
    const doc = new jsPDF("p","mm","a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    let currentY = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(16,185,129);
    doc.text("Interview Analytics Report", pageWidth/2, currentY, {align:"center"});

    currentY += 5;

    doc.setDrawColor(16,185,129);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 15;

    doc.setFillColor(240,253,244);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14)
    doc.setTextColor(0,0,0)
    doc.text(`Final Score: ${finalScore}/10`, pageWidth/2, currentY + 12, {align:"center"})

    currentY += 30;

    doc.setFillColor(249,250,251);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

    doc.setFontSize(12);
    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 12);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 22);
    doc.text(`Correctness: ${correctness}`, margin + contentWidth/2 + 10, currentY + 12); 

    currentY += 45;

    let advice = "";
    if(finalScore >= 8){
      advice = "Excellent performance! You're well-prepared for job opportunities.";
    }else if(finalScore >= 5){
      advice = "Good effort! With some improvement, you'll be ready for job opportunities.";
    }else {
      advice = "Don't be discouraged! Focus on improving your skills, and you'll get there.";
    }

    doc.setFillColor(255,255,255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "FD");

    doc.setFont("helvetica", "bold");
    doc.text("Performance Summary:", margin + 10, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);

    currentY += 50;

    autoTable(doc,{
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["Question", "Score", "AI Feedback"]],
      body: questionWiseScore.map((q, i) => [
        q.question || "Question not available",
        `${q.score ?? 0}/10`,
        q.feedback || "No feedback available"
      ]),
      styles:{
        fontSize:9,
        cellPadding:5,
        valign:"top",
      },
      headStyles:{
        fillColor:[16,185,129],
        textColor:255,
        halign:"center",
      },
      columnStyles:{
        0:{cellWidth:80},
        1:{cellWidth:25, halign:"center"},
        2:{cellWidth:"auto"}
      },
      alternateRowStyles:{
        fillColor:[249,250,251]
      },
    });

    doc.save("AI_interview_Report.pdf");
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4 sm:px-6 lg:px-10 py-8 text-white'>

      <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='md:mb-10 w-full flex items-start gap-4 flex-wrap'>
          <button
            onClick={() => navigate("/history")}
            className='mt-1 p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition'>
            <FaArrowLeft className='text-white' />
          </button>

          <div>
            <h1 className='text-3xl font-bold'>Interview Analytics Dashboard</h1>
            <p className='text-gray-400 mt-2'>Ai-powered interview analysis and performance insights</p>
          </div>
        </div>

        <button 
        onClick={downloadPDF}
        className='bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white py-3 px-6 rounded-xl shadow-lg transition-all font-semibold'>
          Download Pdf
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
        <div className='space-y-6'>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg p-8 text-center' >

            <h3 className='text-gray-300 mb-6'>Overall Performance</h3>

            <div className='relative w-24 h-24 mx-auto'>
              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#10b981",
                  textColor: "#ffffff",
                  trailColor: "#374151",
                })}
              />
            </div>

            <div className='mt-4'>
              <p className='font-semibold text-white'>{performanceText}</p>
              <p className='text-gray-400 text-sm mt-1'>{shortTagline}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg p-8'>

            <h3 className='text-lg font-semibold text-white mb-6'>Skill Evaluation</h3>

            <div className='space-y-5'>
              {
                skills.map((s, i) => (
                  <div key={i}>
                    <div className='flex justify-between mb-2'>
                      <span>{s.label}</span>
                      <span className='font-semibold text-emerald-400'>{s.value}/10</span>
                    </div>

                    <div className='bg-gray-700 h-3 rounded-full'>
                      <div
                        className='bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full'
                        style={{ width: `${s.value * 10}%` }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>

          </motion.div>
        </div>

        <div className='lg:col-span-2 space-y-6'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg p-8'>

            <h3 className='text-lg font-semibold text-white mb-6'>Performance Trend</h3>

            <div className='h-72'>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis domain={[0, 10]} stroke="#9ca3af" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    fill="#10b981"
                    strokeWidth={3}
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg p-8'
          >

            <h3 className='text-lg font-semibold text-white mb-6'>
              Question Breakdown
            </h3>

            <div className='space-y-6'>
              {
                questionWiseScore.map((q, i) => (
                  <div key={i} className='bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition'>
                    
                    <div className='flex flex-col sm:flex-row sm:justify-between gap-3 mb-4'>

                      <div>
                        <p className='text-xs text-gray-400'>Question {i + 1}</p>

                        <p className='font-semibold text-white'>
                          {q.question || "Question not available"}
                        </p>
                      </div>

                      <div className='bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold text-sm w-fit'>
                        {q.score ?? 0}/10
                      </div>

                    </div>

                    <div className='bg-black/30 border border-white/10 p-4 rounded-lg'>

                      <p className='text-xs text-emerald-400 font-semibold mb-1'>AI Feedback</p>
                      <p className='text-gray-300 text-sm'>
                        {q.feedback && q.feedback.trim() !== "" ? q.feedback : "no feedback available for this questions"}
                      </p>

                    </div>

                  </div>
                ))
              }
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Step3Report