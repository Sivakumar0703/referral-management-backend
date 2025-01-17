import Candidate from "../models/candidate.model.js";
import User from "../models/user.model.js";
import { validateEmail, validateMobileNumber } from "../utils/validation.js";
import uploadResumeToCloud from "./uploadResume.controller.js";

// get all candidate data
export const getAllCandidate = async(req,res) => {
    try {
        const candidates = await Candidate.find();
        const length = candidates.length;
        res.status(200).json({message:"candidates data fetched successfully", length, candidates});
    } catch (error) {
        console.log("error in fetching all candidate data", error);
        res.status(500).json({message:"internal server error"});
    }
}


// register a user
export const registerCandidate = async(req,res) => {
    const {name, email, phoneNumber, jobTitle } = req.body;
    try {
        // check the name, email, phoneNumber and jobTitle data are available
        if(!email || !name || !phoneNumber || !jobTitle){
            return res.status(400).json({message:"name, email, phoneNumber and jobTitle are required"});
        }
        // validate email
        const validateMail = validateEmail(email);
        if(!validateMail){
            return res.status(400).json({message:"invalid email"}); 
        }
        // validate phone number
        const validatePhoneNumber = validateMobileNumber(phoneNumber);
        if(!validatePhoneNumber){
            return res.status(400).json({message:"invalid phone number"}); 
        }
        // check if the candidate is already referred for same job title
        const existingCandidate = await User.findOne({email});
        if(existingCandidate && (existingCandidate.jobTitle === jobTitle) ){
            return res.status(409).json({message:"candidate already exists for same job title"});
        }
        // create referral for the candidate
        const referrerId = req.user._id;
        const referrer = await User.findById(referrerId);
        if(!referrer){
            return res.status(404).json({message:"referrer id is missing"});
        }
        // handle file upload (resume-pdf)
        if(!req.file){
            return res.status(400).json({message:"resume file is missing"});
        }
        const resumeUrl = await uploadResumeToCloud(req.file);
        console.log('url', resumeUrl);
        // save the candidate data in db
        const candidateData = {
            name,
            email,
            phoneNumber,
            jobTitle,
            referredBy: referrerId,
            resumeUrl
        }
        const candidate = await Candidate.create(candidateData);
        // add the newly referred candidate id into referrer's account
        referrer.referredCandidates = [...referrer.referredCandidates, candidate._id];
        await referrer.save();
        res.status(201).json({message:"candidate referred successfully"});
    } catch (error) {
        console.log("error in candidate referral", error);
        res.status(500).json({message:"internal server error"});
    }
}


// update candidate job status 
export const updateCandidateJobStatus = async(req,res) => {
    const {jobStatus} = req.body;
    const {id} = req.params;
    const allowedJobStatus = ['pending', 'reviewed', 'hired'];
    try {
        // check whether the candidate is available or not in db
        const candidate = await Candidate.findById(id);
        if(!candidate){
            return res.status(404).json({message:"candidate not found. invalid id"});
        }
        // check job status is available
        if(!jobStatus){
            return res.status(400).json({message:"job status is required"});
        }
        // check only the valid job status is entered
        const isJobStatusValid = allowedJobStatus.includes(jobStatus);
        if(!isJobStatusValid){
            return res.status(400).json({message:"invalid job status was passed"});
        }
        // check whether the previous job status is same as the new status
        if(candidate.jobStatus === jobStatus){
            return res.status(200).json({message:"job status is already up to date"});
        }
        // update job status
        candidate.jobStatus = jobStatus;
        await candidate.save();
        res.status(200).json({message:"job status updated sucessfully"});
    } catch (error) {
        console.log("error in candidate updation", error);
        res.status(500).json({message:"internal server error"});
    }
}