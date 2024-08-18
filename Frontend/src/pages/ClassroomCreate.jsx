import axios from 'axios';
import React, { useRef } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
//import TimePicker from "react-time-picker"

export const ClassroomCreate = () => {

    let name = useRef();
    let startTime = useRef();
    let endTime = useRef();
    let day = useRef();
    let navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            toast.loading("Creating", { id: "create" });
            console.log({
                name: name.current.value,
                startTime: startTime.current.value,
                endTime: endTime.current.value,
                day: day.current.value
            });
            let res = await axios.post("/data/classroom", {
                name: name.current.value,
                startTime: startTime.current.value,
                endTime: endTime.current.value,
                day: day.current.value
            })

            console.log(res);




            if (res.status == 200) {
                toast.success("Created", { id: "create" });
                navigate("/principal");

            }
        } catch (err) {
            console.log(err);
            toast.error(err.message, { id: "create" });
        }

    }


    return (
        <div className=''>
            <form class="max-w-sm mx-auto form-style" onSubmit={(e) => submitHandler(e)}>
                <div class="mb-10">
                    <label for="name" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required ref={name} />
                </div>
                <div class="mb-10">
                    <label for="startTime" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
                    <input type="time" id="startTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required ref={startTime} />
                </div>
                <div class="mb-10">
                    <label for="endTime" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">End Time</label>
                    <input type="time" id="endTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required ref={endTime} />
                </div>
                <div class=" mb-8">
                    <label for="day" class="mb-3 text-sm font-medium text-gray-900 dark:text-white mr-3">Day</label>
                    <select id="day" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={day}>
                        <option selected>Choose a Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                    </select>
                </div>
                <button type="submit" class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    )
}



