import { hash } from "bcrypt";
import { Classroom } from "../models/classroomSchema.js";
import { Student } from "../models/studentSchema.js";
import { Teacher } from "../models/teacherSchema.js";

export const getAllTeachers = async (req, res) => {
    try {
        let { category } = res.locals.jwtData;

        if (category == "principal") {
            let allTeachers = await Teacher.find({}).populate('classroom');

            return res.status(200).json({
                message: "OK", allTeachers
            })
        } else {
            return res.status(400).json({ message: "ERROR", cause: "user not authorized" });
        }

    } catch (err) {
        return res.status(400).json({ message: "ERROR", cause: err.message });
    }
}

export const getAllClassrooms = async (req, res) => {
    try {
        let { category } = res.locals.jwtData;

        if (category == "principal") {
            let allClassrooms = await Classroom.find({});

            return res.status(200).json({
                message: "OK", allClassrooms
            })
        } else {
            return res.status(400).json({ message: "ERROR", cause: "user not authorized" });
        }

    } catch (err) {
        return res.status(400).json({ message: "ERROR", cause: err.message });
    }
}

export const getAllStudents = async (req, res) => {
    try {
        let { category } = res.locals.jwtData;

        if (category == "principal") {
            let allStudents = await Student.find({}).populate('classroom');

            return res.status(200).json({
                message: "OK", allStudents
            })
        } else {
            return res.status(400).json({ message: "ERROR", cause: "user not authorized" });
        }

    } catch (err) {
        return res.status(400).json({ message: "ERROR", cause: err.message });
    }
}





export const createClassroom = async (req, res) => {

    try {
        let { category } = res.locals.jwtData;

        if (category == "principal") {
            let { name, day, startTime, endTime } = req.body;

            let classroom = await Classroom.findOne({ name });
            let result;

            if (classroom) {
                classroom.info.push({
                    day,
                    startTime: startTime.toString(),
                    endTime: endTime.toString()
                })

                result = await classroom.save();

            } else {
                let info = [];
                info.push({
                    day,
                    startTime: startTime.toString(),
                    endTime: endTime.toString()
                });

                let newClassroom = new Classroom({
                    name,
                    info,
                });
                result = await newClassroom.save();
            }

            return res.status(200).json({
                message: "OK", newClassroom: result
            });
        } else {
            return res.status(400).json({
                message: "ERROR", cause: "user is not authorised"
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "ERROR", cause: err.message
        })
    }

};

export const createTeacher = async (req, res) => {
    try {
        let { category } = res.locals.jwtData;

        if (category == "principal") {
            let { email, password, classroom } = req.body;

            let teacher = await Teacher.findOne({ email }).populate('classroom');
            let result;

            if (teacher) {
                return res.status(400).json({
                    message: "ERROR",
                    cause: "teacher already exists"
                });
            }

            let classAssigned = await Classroom.findOne({ name: classroom });

            if (!classAssigned) {
                return res.status(400).json({
                    message: "ERROR",
                    cause: "class dont exist"
                })
            }

            password = await hash(password, 10);


            let newTeacher = new Teacher({
                email,
                password,
                classroom: classAssigned._id,
            });

            result = await newTeacher.save();


            return res.status(200).json({
                message: "OK", newTeacher: result
            });

        } else {
            return res.status(400).json({
                message: "ERROR", cause: "user is not authorised"
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "ERROR", cause: err.message
        })
    }
};

export const createStudent = async (req, res) => {
    try {
        let { category } = res.locals.jwtData;

        if (category == "principal" || category == "teacher") {
            let { email, password, classroom } = req.body;

            let student = await Student.findOne({ email }).populate('classroom');
            let result;

            if (student) {
                return res.status(400).json({
                    message: "ERROR",
                    cause: "student already exists"
                });
            }

            let classAssigned = await Classroom.findOne({ name: classroom });

            if (!classAssigned) {
                return res.status(400).json({
                    message: "ERROR",
                    cause: "class dont exist"
                })
            }

            password = await hash(password, 10);

            let newStudent = new Student({
                email,
                password,
                classroom: classAssigned._id
            });

            result = await newStudent.save();


            return res.status(200).json({
                message: "OK", newStudent: result
            });

        } else {
            return res.status(400).json({
                message: "ERROR", cause: "user is not authorised"
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "ERROR", cause: err.message
        })
    }
};






export const editTeacher = async (req, res) => {
    try {
        let { category } = res.locals.jwtData;

        if (category == "principal") {
            let { email, password, classroom, existingEmail } = req.body;

            let teacher = await Teacher.findOne({ email: existingEmail }).populate('classroom');
            let result;

            if (!teacher) {
                return res.status(400).json({
                    message: "ERROR",
                    cause: "teacher dont exists"
                });
            }

            let classAssigned = await Classroom.findOne({ name: classroom });

            if (!classAssigned) {
                return res.status(400).json({
                    message: "ERROR",
                    cause: "class dont exist"
                })
            }

            password = await hash(password, 10);

            teacher.email = email;
            teacher.password = password;
            teacher.classroom = classAssigned._id;

            result = await teacher.save();



            return res.status(200).json({
                message: "OK", editedTeacher: result,
            });

        } else {
            return res.status(400).json({
                message: "ERROR", cause: "user is not authorised"
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "ERROR", cause: err.message
        })
    }
};

export const editStudent = async (req, res) => {
    try {
        let { category } = res.locals.jwtData;

        if (category == "principal" || category == "teacher") {
            let { email, password, classroom, existingEmail } = req.body;

            let student = await Student.findOne({ email: existingEmail }).populate('classroom');
            let result;

            if (!student) {
                return res.status(400).json({
                    message: "ERROR",
                    cause: "student dont exists"
                });
            }

            let classAssigned = await Classroom.findOne({ name: classroom });

            if (!classAssigned) {
                return res.status(400).json({
                    message: "ERROR",
                    cause: "class dont exist"
                })
            }

            password = await hash(password, 10);

            student.email = email;
            student.password = password;
            student.classroom = classAssigned._id;

            result = await student.save();


            return res.status(200).json({
                message: "OK", editedStudent: result
            });

        } else {
            return res.status(400).json({
                message: "ERROR", cause: "user is not authorised"
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "ERROR", cause: err.message
        })
    }
};





export const deleteTeacher = async (req, res) => {
    try {
        let { category } = res.locals.jwtData;

        if (category == "principal") {
            let { email } = req.body;

            let teacher = await Teacher.findOneAndDelete({ email });


            return res.status(200).json({
                message: "OK"
            });

        } else {
            return res.status(400).json({
                message: "ERROR", cause: "user is not authorised"
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "ERROR", cause: err.message
        })
    }
};

export const deleteStudent = async (req, res) => {
    try {
        let { category } = res.locals.jwtData;

        if (category == "principal" || category == "teacher") {
            let { email } = req.body;

            let student = await Student.findOneAndDelete({ email }).populate('classroom');


            return res.status(200).json({
                message: "OK"
            });

        } else {
            return res.status(400).json({
                message: "ERROR", cause: "user is not authorised"
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "ERROR", cause: err.message
        })
    }
};



export const sameClassroom = async (req, res) => {
    try {
        let { category, classroom } = res.locals.jwtData;

        if (category == "principal" || category == "teacher" || category == "student") {
            let allStudents = await Student.find({ classroom }).populate('classroom');

            return res.status(200).json({
                message: "OK", sameClassroomStudents: allStudents
            })
        } else {
            return res.status(400).json({ message: "ERROR", cause: "user not authorized" });
        }

    } catch (err) {
        return res.status(400).json({ message: "ERROR", cause: err.message });
    }
};