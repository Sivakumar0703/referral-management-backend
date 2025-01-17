import express from "express";
import { getAllCandidate, registerCandidate, updateCandidateJobStatus } from "../controllers/candidate.controller.js";
import authenticate from "../middlewares/authUser.middleware.js";
import upload from "../middlewares/multer.middleware.js";


const candidateRouter = express.Router();

candidateRouter.get('/', authenticate, getAllCandidate);
candidateRouter.post('/', authenticate, upload.single('resume'), registerCandidate);
candidateRouter.put('/:id/status', authenticate, updateCandidateJobStatus);


export default candidateRouter