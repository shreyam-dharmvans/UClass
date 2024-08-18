import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classrooms'
    }
}, { strictPopulate: false });

export const Teacher = mongoose.model("teachers", teacherSchema);