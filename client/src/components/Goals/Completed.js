import React from 'react'

const Completed = ({ logs }) => (
    <div>
        {logs.length} of 100 days completed<br />
        {/* {days(logs).map((day,i) => (
            <span key={i}>
                {
                    day === 1 ? (<span> &#10003; </span>) : <span> &times; </span>
                }
            </span>))
        } */}
    </div>
);

export default Completed

// function days(logs) {
//     let completed = []
//     let diff
//     let last = logs[logs.length - 1].when
//     return logs.slice(-5).map((day, i) => {
//         day.diff = date_diff(day.when, completed[logs.length - 5 + i - 1])
//         for(let j=1;j<diff;j++)
//             completed.push(2)
//         completed.push(1)
//         last = day.when
//         return day;
//     })
// }

// function date_diff(day, start_date) {
//     const dt1 = new Date(start_date)
//     const dt2 = new Date(day)
//     return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))
// }