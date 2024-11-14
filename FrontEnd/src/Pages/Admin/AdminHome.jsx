import React from "react";
import AdminNavbar from "..//Components/navbar/AdminNavbar";
import Leftbar from "../Components/Appointment/Leftbar";
let AdminHome = () => {
  return (
      <div className="payment dashboard">
          <AdminNavbar/>
          <div className="body">
              <Leftbar className='leftBar'/>
          </div>
      </div>
  );
};
export default AdminHome;