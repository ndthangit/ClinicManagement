import React from "react";
import AdminNavbar from "../components/navbar/AdminNavbar";
import Leftbar from "../components/leftbar/Leftbar";
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