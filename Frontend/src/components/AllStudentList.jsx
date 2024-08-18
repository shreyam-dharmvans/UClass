import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AllStudentList = () => {
    const [allStudents, setAllStudents] = useState([]);
    // const [trigger, setTrigger] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        const getAllStudents = async () => {
            try {
                toast.loading("fetching data", { id: "fetch" });
                let res = await axios.get("/data/allStudents");


                if (res.status == 200) {
                    setAllStudents(res.data.allStudents);
                    //  console.log(res.data.allStudents);
                    // console.log(res.data.allClassrooms);
                    toast.success("data fetched", { id: "fetch" });
                }

            } catch (err) {
                toast.error(err.message, { id: "allStudents" });
            }

        }

        getAllStudents();
    }, [])

    const editStudent = (student) => {
        navigate("/student-edit", { state: { student, category: "principal" } });
        // setTimeout(() => {
        //     setTrigger(!trigger);
        // }, 5000)
    }

    const deleteStudent = async (email) => {

        try {
            toast.loading("deleting student", { id: "delete" });
            let res = await axios.delete("/data/student", { email });

            if (res.status == 200) {
                let studentList = allStudents.filter((student) => student.email != email);

                setAllStudents(studentList);
                toast.success("student deleted", { id: "delete" });
            }

        } catch (err) {
            toast.error(err.message, { id: "delete" });
        }

    }


    return (
        <div className='class-list mr-40 mt-40'>
            <div className='text-white mb-5'>Student List</div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg student-list">
                <table class=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Student Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Classroom
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {allStudents.map((student) => {
                            return <tr>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {student.email}
                                </th>
                                <td class="px-6 py-4">
                                    {student.classroom.name}
                                </td>
                                <td class="px-6 py-4 text-blue-600">
                                    <button onClick={() => editStudent(student)}>Edit</button>
                                </td>
                                <td class="px-6 py-4 text-red-700">
                                    <button onClick={() => deleteStudent(student.email)}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
