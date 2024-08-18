import React from 'react'

export const Classroom = ({ classroom }) => {
    // console.log(classroom);
    return (
        // <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <>
            {classroom.info.map((info) => {
                return <tr>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {classroom.name}
                    </th>
                    <td class="px-6 py-4">
                        {info.startTime}
                    </td>
                    <td class="px-6 py-4">
                        {info.endTime}
                    </td>
                    <td class="px-6 py-4">
                        {info.day}
                    </td>
                </tr>
            })}
        </>

        // </tr>
    )
}
