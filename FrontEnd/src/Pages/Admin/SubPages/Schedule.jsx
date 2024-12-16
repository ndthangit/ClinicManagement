import React from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import AdminLeftbarSchedule from "../../components/leftbar/AdminNavbarSchedule";
let Schedule = () => {
    return (
        <div className="payment dashboard">
            <AdminNavbar/>
            <div className="body">
                <AdminLeftbarSchedule className='leftBar'/>
            </div>
        </div>
    );
};
export default Schedule