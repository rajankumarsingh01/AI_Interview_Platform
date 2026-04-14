import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { upload } from '../middlewares/multer.js'
import { finishinterview, generateQuestions, getInterviewReport, getMyInterviews, Resumeanalyzer, submitanswer } from '../controllers/interview.controller.js';
import { deleteInterview } from "../controllers/interview.controller.js";

const interviewRouter = express.Router()

interviewRouter.post("/resume",isAuth,upload.single("resume"),Resumeanalyzer);
interviewRouter.post("/generate-questions",isAuth,generateQuestions);
interviewRouter.post("/submit-answer",isAuth,submitanswer);
interviewRouter.post("/finish",isAuth,finishinterview);
interviewRouter.get("/get-interview",isAuth,getMyInterviews);
interviewRouter.get("/report/:id",isAuth,getInterviewReport);


interviewRouter.delete("/delete/:id", isAuth, deleteInterview);



export default interviewRouter;