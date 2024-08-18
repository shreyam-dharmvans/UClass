import axios from 'axios';
import React, { useRef } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export const StudentEdit = () => {
    let email = useRef();
    let password = useRef();
    let classroom = useRef();
    const location = useLocation();
    let currData = location.state.student;
    let category = location.state.category;
    let navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            toast.loading("Editing", { id: "edit" });
            console.log({
                email: email.current.value,
                password: password.current.value,
                classroom: classroom.current.value,
                existingEmail: currData.email
            });
            let res = await axios.put("/data/student", {
                email: email.current.value,
                password: password.current.value,
                classroom: classroom.current.value,
                existingEmail: currData.email
            })

            console.log(res);




            if (res.status == 200) {
                toast.success("edited", { id: "edit" });
                if (category == "principal") {
                    navigate("/principal");
                }
                else if (category == "teacher") {
                    navigate("/teacher");
                }


            }
        } catch (err) {
            console.log(err);
            toast.error(err.message, { id: "edit" });
        }

    }


    return (
        <div className=''>
            <form class="max-w-sm mx-auto form-style" onSubmit={(e) => submitHandler(e)}>
                <div class="mb-10">
                    <label for="email" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required ref={email} defaultValue={currData.email} />
                </div>
                <div class="mb-10">
                    <label for="password" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required ref={password} />
                </div>
                <div class="mb-10">
                    <label for="classroom" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Classroom</label>
                    <input type="text" id="classroom" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required ref={classroom} defaultValue={currData.classroom.name} />
                </div>
                <button type="submit" class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    )
}
