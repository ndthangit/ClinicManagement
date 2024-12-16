import React from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import ServiceLeftbar from "../../components/leftbar/ServiceLeftbar";
let Services = () => {
    return (
        <div className="payment dashboard">
            <AdminNavbar/>
            <div className="body">
                <ServiceLeftbar className='leftBar'/>
            </div>
        </div>
    );
};
export default Services