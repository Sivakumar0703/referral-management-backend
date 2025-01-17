import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true 
    },
    jobTitle: {
        type: String,
        required: true 
    },
    jobStatus: {
        type: String,
        enum: ['pending', 'hired', 'reviewed'],
        default: "pending"
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resumeUrl:{
        type: String,
        required: true
    }

});

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;