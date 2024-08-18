import React from 'react'
import { AllClassroomList } from '../components/AllClassroomList'
import { AllStudentList } from '../components/AllStudentList'
import { AllTeacherList } from '../components/AllTeacherList.jsx'

export const PrincipalPage = () => {
    return (
        <div className='principal-page flex flex-wrap justify-around'>
            <AllClassroomList className="" />
            <AllStudentList className="" />
            <AllTeacherList className="" />
        </div>
    )
}
