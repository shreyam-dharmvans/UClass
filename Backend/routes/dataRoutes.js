import { Router } from "express";
import { createClassroom, createStudent, createTeacher, deleteStudent, deleteTeacher, editStudent, editTeacher, getAllClassrooms, getAllStudents, getAllTeachers, sameClassroom } from "../controllers/dataController.js";
import { verifyToken } from "../utils/token.js";


export const dataRouter = Router();

dataRouter.get("/allTeacher", verifyToken, getAllTeachers);
dataRouter.get("/allStudents", verifyToken, getAllStudents);
dataRouter.get("/allClassrooms", verifyToken, getAllClassrooms);

dataRouter.post("/classroom", verifyToken, createClassroom);
dataRouter.post("/teacher", verifyToken, createTeacher);
dataRouter.post("/student", verifyToken, createStudent);

dataRouter.put("/teacher", verifyToken, editTeacher);
dataRouter.put("/student", verifyToken, editStudent);

dataRouter.delete("/teacher", verifyToken, deleteTeacher);
dataRouter.delete("/student", verifyToken, deleteStudent);


dataRouter.get("/sameClassroom", verifyToken, sameClassroom);