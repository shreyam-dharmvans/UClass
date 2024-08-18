import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const OtherStudents = () => {
    const [allStudents, setAllStudents] = useState([]);

    useEffect(() => {
        const getAllStudents = async () => {
            try {
                toast.loading("fetching all Students", { id: "allStudents" });
                let res = await axios.get("/data/sameClassroom");

                console.log(res);
                if (res.status == 200) {
                    setAllStudents(res.data.sameClassroomStudents);

                    toast.success("data fetched", { id: "allStudents" });
                }

            } catch (err) {
                toast.error(err.message, { id: "allStudents" });
            }

        }

        getAllStudents();
    }, [])


    return (
        <div className='class-list  same-class mt-40'>
            <div className='text-white mb-5'>Student List</div>
            <div class="relative overflow-x-auto same-classroom shadow-md sm:rounded-lg student-list other-students">
                <table class=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Student Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Classroom
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
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


