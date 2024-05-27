import React, { useEffect, useState } from "react";
import { adminLink } from "../../../lib/data.js";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import withAuth from "../../hooks/withAuth.jsx";

function DashboardPage() {
  const [admin, setAdmin] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (!userData || userData.length === 0) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
        if (user.role === "admin") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      }
    }
  }, [userData]);

  if (admin) {
    window.location.href = `${adminLink}/${userData?._id}`;
  } else {
    return (
      <>
        <Dashboard />
      </>
    );
  }
}

// export default DashboardPage;
export default withAuth(DashboardPage);
