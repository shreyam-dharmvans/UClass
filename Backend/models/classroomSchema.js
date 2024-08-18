import mongoose from "mongoose";

const classroomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    info: [{
        day: {
            type: String,
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    }],
})

export const Classroom = mongoose.model("classrooms", classroomSchema);