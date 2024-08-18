import { compare, hash } from "bcrypt";
import { Teacher } from "../models/teacherSchema.js";
import { Student } from "../models/studentSchema.js";
import { Principal } from "../models/pricipalSchema.js";
import { createToken } from "../utils/token.js";

export const loginUser = async (req, res) => {
    try {
        let { email, password, category } = req.body;
        let arr;

        if (category == "teacher") {
            arr = await Teacher.find({ email }).populate('classroom');
        }
        else if (category == "student") {
            arr = await Student.find({ email }).populate('classroom');
        } else if (category == "principal") {
            arr = await Principal.find({ email });
            //console.log(arr);
        }

        let user = arr[0];
        //console.log(user);

        if (!user) {
            return res.status(400).json({ messsage: "ERROR", cause: "user not registered" });
        }

        let result = await compare(password, user.password);

        if (!result) {
            return res.status(400).json({ message: "ERROR", cause: "password is incorrect" });
        }

        res.clearCookie("auth_token", { //removing previous token of user if stored
            httpOnly: true,
            signed: true,
            sameSite: 'none',
            secure: true
        });

        let token = createToken(user._id, user.email, user.classroom, category, "7d");
        let expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie("auth_token", token, {
            expires,
            httpOnly: true,
            signed: true,
            sameSite: 'none',
            secure: true
        });

        return res.status(200).json({ message: "OK" });

    } catch (err) {
        return res.status(400).json({ message: "ERROR", cause: err.message });
    }

}

export const logoutUser = (req, res) => {
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            signed: true,
            sameSite: 'none',
            secure: true
        });

        return res.status(200).json({ message: "OK" });
    } catch (err) {
        return res.status(400).json({ message: "ERROR", cause: err.message });
    }


}


