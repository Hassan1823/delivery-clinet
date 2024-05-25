import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { backendLink } from "../../lib/data";
import toast from "react-hot-toast";
const VerifyPage = () => {
  const [userID, setUserID] = useState("");
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  let { verify } = useParams();
  const navigate = useNavigate();

  console.log(verify ? verify : "no id");

  useEffect(() => {
    setUserID(verify || "");
  }, [verify]);

  const getUser = async (userID) => {
    try {
      const response = await fetch(`${backendLink}/api/auth/getUser/${userID}`);
      if (!response.ok) {
        console.log("Something Went Wrong");
        //   toast.error("Something Went Wrong");
      } else {
        const res = await response.json();
        console.log(res.data);
        setData(res.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userID && userID !== "") {
      getUser(userID);
    }
  }, [userID]);

  const verifyAdminStatus = async ({ status }) => {
    try {
      console.log("status ::: ", status);
      const response = await fetch(
        `${backendLink}/api/auth/verifyAdmin/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: status }),
        }
      );

      if (!response.ok) {
        toast.error("Something Went Wrong");
      } else {
        const res = await response.json();
        console.log(res.data);
        toast.success("Status Updated Sucessfully ");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-[10%] w-full h-screen flex flex-col justify-start gap-6 items-center">
      <h1 className="text-xl font-semibold leading-6 text-black">
        {data?.role || ""} Verification for {data?.fullName || "User"}
      </h1>
      <div className="flex items-start justify-center w-full h-auto gap-4">
        <button
          className="w-auto h-auto px-6 py-2 text-base font-semibold text-white bg-green-600 border-none rounded-lg outline-none focus:outline-none"
          onClick={() => {
            setStatus(true);
            verifyAdminStatus({ status: true });
          }}
        >
          Verify
        </button>
        <button
          className="w-auto h-auto px-6 py-2 text-base font-semibold text-white bg-red-600 border-none rounded-lg outline-none focus:outline-none"
          onClick={() => {
            setStatus(false);
            verifyAdminStatus({ status: false });
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default VerifyPage;
