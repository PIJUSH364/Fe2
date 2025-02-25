import React from 'react'
import { dateFormatter } from '../../utils/method/helper'

export default function TableCell({ date }) {
    return (
        <td className="p-2 text-gray-700 font-nunito align-middle  hidden sm:table-cell  md:table-cell text-left">
            {date ? dateFormatter(date) : dateFormatter()}
        </td>

    )
}
