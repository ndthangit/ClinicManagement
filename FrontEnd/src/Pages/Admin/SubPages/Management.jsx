import React from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import AdminLeftbarManagement from "../../components/leftbar/AdminLeftbarManagement";
let Management = () => {
    return (
        <div className="payment dashboard">
            <AdminNavbar/>
            <div className="body">
                <AdminLeftbarManagement className='leftBar'/>
            </div>
        </div>
    );
};
export default Management