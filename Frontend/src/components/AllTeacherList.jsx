import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AllTeacherList = () => {
    const [allTeachers, setAllTeachers] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        const getAllTeachers = async () => {
            try {
                //toast.loading("fetching data", { id: "fetch" });
                let res = await axios.get("/data/allTeacher");
                console.log(res);
                if (res.status == 200) {
                    setAllTeachers(res.data.allTeachers);
                    console.log(res.data.allTeachers);
                    // console.log(res.data.allClassrooms);
                    //toast.success("data fetched", { id: "fetch" });
                }

            } catch (err) {
                toast.error(err.message, { id: "allTeachers" });
            }

        }

        getAllTeachers();
    }, [])

    const editTeacher = (teacher) => {
        navigate("/teacher-edit", { state: teacher });
        // setTimeout(() => {
        //     setTrigger(!trigger);
        // }, 5000)
    }

    const deleteTeacher = async (email) => {

        try {
            toast.loading("deleting teachers", { id: "delete" });
            let res = await axios.delete("/data/teacher", { email });

            if (res.status == 200) {
                let teachersList = allTeachers.filter((teacher) => teacher.email != email);

                setAllTeachers(teachersList);
                toast.success("teacher deleted", { id: "delete" });
            }

        } catch (err) {
            console.log(err);
            toast.error(err.message, { id: "delete" });
        }

    }


    return (
        <div className='class-list mt-40 mb-20'>
            <div className='text-white mb-5'>Teacher List</div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg teacher-list">
                <table class=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Teacher Email
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
                        {allTeachers.map((teacher) => {
                            return <tr>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {teacher.email}
                                </th>
                                <td class="px-6 py-4">
                                    {teacher.classroom.name}
                                </td>
                                <td class="px-6 py-4 text-blue-600">
                                    <button onClick={() => editTeacher(teacher)}>Edit</button>
                                </td>
                                <td class="px-6 py-4 text-red-700">
                                    <button onClick={() => deleteTeacher(teacher.email)}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

