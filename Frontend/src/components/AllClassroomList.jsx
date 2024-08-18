import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Classroom } from './Classroom.jsx';

export const AllClassroomList = () => {
    const [allClassrooms, setAllClassrooms] = useState([]);

    useEffect(() => {
        const getAllClassroom = async () => {
            try {
                //  toast.loading("fetching all Classrooms", { id: "allClass" });
                let res = await axios.get("/data/allClassrooms");


                if (res.status == 200) {
                    setAllClassrooms(res.data.allClassrooms);
                    // console.log(res.data.allClassrooms);
                    //  toast.success("data fetched", { id: "allClass" });
                }

            } catch (err) {
                toast.error(err.message, { id: "allClass" });
            }

        }

        getAllClassroom();
    }, [])
    return (
        <div className='class-list ml-10 mr-40 mt-40'>
            <div className='text-white mb-5'>Classroom List</div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg classroom-list">
                <table class=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ClassName
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Start Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                End Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                day
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {allClassrooms.map((classroom) => {
                            return <Classroom classroom={classroom} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
