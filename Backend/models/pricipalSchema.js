import { hash } from "bcrypt";
import mongoose from "mongoose";

const principalSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export const Principal = mongoose.model("principal", principalSchema);

// let pass = await hash("Admin", 10);

// let p = new Principal({
//     email: "principal@classroom.com",
//     password: pass,
// })

// p.save();