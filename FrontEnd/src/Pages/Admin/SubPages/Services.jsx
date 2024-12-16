import React from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import AdminServiceLeftbar from "../../components/leftbar/AdminServiceLeftbar";
let Services = () => {
    return (
        <div className="payment dashboard">
            <AdminNavbar/>
            <div className="body">
                <AdminServiceLeftbar className='leftBar'/>
            </div>
        </div>
    );
};
export default Services