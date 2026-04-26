




import React, { useState, useEffect, useRef } from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from 'framer-motion'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import axios from 'axios';
import { ServerUrl } from '../App'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Step2Interview = ({ interviewData, onFinish }) => {

  const { interviewId, questions, username } = interviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicon, setisMICON] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [timeLeft, setTimeLeft] = useState(
    questions?.[0]?.timeLimit || 60
  );

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [voiceGender, setVoiceGender] = useState("female");
  const [voiceGender, setVoiceGender] = useState("male");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = questions?.[currentIndex];

  useEffect(() => {

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // const femaleVoice = voices.find(v =>
      //   v.name.toLowerCase().includes("zira") ||
      //   v.name.toLowerCase().includes("samantha") ||
      //   v.name.toLowerCase().includes("female")
      // );

      // if (femaleVoice) {
      //   setSelectedVoice(femaleVoice);
      //   setVoiceGender("female");
      //   return;
      // }

      // const maleVoice = voices.find(v =>
      //   v.name.toLowerCase().includes("david") ||
      //   v.name.toLowerCase().includes("mark") ||
      //   v.name.toLowerCase().includes("male")
      // );

      // if (maleVoice) {
      //   setSelectedVoice(maleVoice);
      //   setVoiceGender("male");
      //   return;
      // }
      const maleVoice = voices.find(v =>
  v.name.toLowerCase().includes("david") ||
  v.name.toLowerCase().includes("mark") ||
  v.name.toLowerCase().includes("male")
);

if (maleVoice) {
  setSelectedVoice(maleVoice);
  setVoiceGender("male");
  return;
}

const femaleVoice = voices.find(v =>
  v.name.toLowerCase().includes("zira") ||
  v.name.toLowerCase().includes("samantha") ||
  v.name.toLowerCase().includes("female")
);

if (femaleVoice) {
  setSelectedVoice(femaleVoice);
  setVoiceGender("female");
  return;
}

      if (voices.length > 0) {
        setSelectedVoice(voices[0]);
        setVoiceGender("female");
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

  }, []);

  const videosource = voiceGender === "male" ? maleVideo : femaleVideo;

  const speakText = (text) => {
    return new Promise((resolve) => {

      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanText = text
        .replace(/,/g, ",..........")
        .replace(/\./g, ". ..........");

      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;

      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        if (videoRef.current) videoRef.current.play();
      };

      utterance.onend = () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }

        setIsAIPlaying(false);

        if (isMicon) {
          startMic();
        }

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);

    });
  };

  useEffect(() => {

    if (!selectedVoice) return;

    const runIntro = async () => {

      if (isIntroPhase) {

        await speakText(`Hello ${username || "Candidate"}, welcome to your AI-powered interview. Let's get started!`);

        await speakText("I will ask you a few questions. Please answer them to the best of your ability. Remember, this is a safe space to learn and grow.");

        setIsIntroPhase(false);

      } else if (currentQuestion) {

        await new Promise(r => setTimeout(r, 800));

        await speakText(currentQuestion.question);

        if (isMicon) {
          startMic();
        }
      }
    };

    runIntro();

  }, [selectedVoice, isIntroPhase, currentIndex]);

  useEffect(() => {
    if (!currentQuestion) return;
    setTimeLeft(currentQuestion.timeLimit || 60);
  }, [currentIndex]);

  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      })
    }, 1000);

    return () => clearInterval(timer);

  }, [isIntroPhase, currentIndex]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;

  }, []);

  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch { }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleMic = () => {
    if (isMicon) {
      stopMic();
    } else {
      startMic();
    }
    setisMICON(!isMicon);
  };

  const submitAnswer = async () => {
    if (isSubmitting || !currentQuestion) return;

    stopMic();
    setIsSubmitting(true);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: (currentQuestion.timeLimit || 60) - timeLeft,
        },
        { withCredentials: true }
      );

      setFeedback(result.data.feedback);

      speakText(result.data.feedback);

      if (currentIndex === questions.length - 1) {
        setTimeout(() => {
          finishInterview();
        }, 1500);
      }

    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Moving to the next question.");

    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => {
      if (isMicon) startMic();
    }, 500);
  };

  const finishInterview = async () => {
    stopMic();
    setisMICON(false);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/finish",
        { interviewId },
        { withCredentials: true }
      );

      console.log("🔥 FINAL RESULT:", result.data);

      onFinish(result.data);

    } catch (error) {
      console.error("Error finishing interview:", error);
    }
  };

  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer();
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4 sm:p-6'>

      <div className='w-full max-w-[1350px] min-h-[80vh] backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden'>

        <div className='w-full lg:w-[35%] bg-white/5 backdrop-blur-lg flex flex-col items-center p-6 space-y-6 border-r border-white/10'>

          <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10'>
            <video
              ref={videoRef}
              src={videosource}
              key={videosource}
              autoPlay
              loop
              muted
              playsInline
              preload='auto'
              className='w-full h-auto object-cover'
            />
          </div>

          {subtitle && (
            <div className='w-full max-w-md bg-white/10 border border-white/20 rounded-xl p-4 shadow'>
              <p className='text-white text-sm sm:text-base font-medium text-center leading-relaxed'>
                {subtitle}
              </p>
            </div>
          )}

          <div className='w-full max-w-md bg-white/10 border border-white/20 rounded-2xl shadow p-6 space-y-5'>

            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-300'>Interview Status</span>
              {isAIPlaying && (
                <span className='text-sm font-semibold text-emerald-400 animate-pulse'>
                  AI speaking...
                </span>
              )}
            </div>

            <div className='h-px bg-white/10'></div>

            <div className='flex justify-center'>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit || 60} />
            </div>

            <div className='h-px bg-white/10'></div>

            <div className='grid grid-cols-2 gap-6 text-center'>
              <div>
                <span className='text-2xl font-bold text-emerald-400'>
                  {currentIndex + 1}
                </span>
                <span className='block text-xs text-gray-400'>CURRENT</span>
              </div>
              <div>
                <span className='text-2xl font-bold text-cyan-400'>
                  {questions?.length}
                </span>
                <span className='block text-xs text-gray-400'>TOTAL</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative'>

          <h2 className='text-xl sm:text-2xl font-bold text-emerald-400 mb-6'>
            AI Smart Interview {username && `- ${username}`}
          </h2>

          {!isIntroPhase && (
            <div className='relative mb-6 bg-white/10 backdrop-blur-lg p-5 sm:p-6 rounded-2xl border border-white/20 shadow'>
              <p className='text-xs sm:text-sm text-gray-400 mb-2'>
                Question {currentIndex + 1} of {questions?.length}
              </p>

              <div className='text-base sm:text-lg font-semibold text-white leading-relaxed pr-16'>
                {currentQuestion?.question || "Loading question..."}
              </div>
            </div>
          )}

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder='Type your answer here...'
            className='flex-1 bg-white/10 backdrop-blur-lg p-4 sm:p-6 rounded-2xl resize-none outline-none border border-white/20 focus:ring-2 focus:ring-emerald-500 transition text-white placeholder-gray-400'
          />

          {!feedback ? (
            <div className='flex items-center gap-4 mt-6'>

              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                className='w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
              >
                {isMicon ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
                className='flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:bg-gray-500'
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>

            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-6 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/20 p-5 rounded-2xl shadow'
            >
              <p className='text-white font-medium mb-4'>
                {feedback}
              </p>
              <button
                onClick={handleNext}
                className='w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-xl shadow hover:opacity-90 transition flex items-center justify-center font-semibold gap-1'
              >
                Next Question <BsArrowRight size={18} />
              </button>
            </motion.div>
          )}

        </div>

      </div>
    </div>
  )
}

export default Step2Interview