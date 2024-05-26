// * imports

// * local imports
import "./home.scss";

import React, { useState, useEffect } from "react";
import AdminDashboard from "../../components/admin/AdminDashboard";
import Sidebar from "../../components/sidebar/Sidebar";

const AdminComp = () => {
  return (
    <div className="home">
      <Sidebar />
    </div>
  );
};

export default AdminComp;
