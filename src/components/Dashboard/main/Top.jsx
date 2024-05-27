import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { backendLink } from "../../../../lib/data";

export const Top = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [insta, setInsta] = useState(0);
  const [facebook, setFacebook] = useState(0);
  const [whatsapp, setWhatsapp] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) {
      fetchCustomers();
    }
  }, [data]);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `${backendLink}/api/customer/getcustomers/${user?._id}`
      );
      if (response.ok) {
        const Customers = await response.json();
        const seenIds = new Set(); // Keep track of IDs we've already processed

        Customers?.data.forEach((item) => {
          if (seenIds.has(item._id)) {
            return; // Skip if we've already processed this item
          }

          // console.log(`Processing unique item:`, item.salesChannel);

          switch (item.salesChannel) {
            case "whatsapp":
              setWhatsapp((prevCount) => {
                // console.log("Updating WhatsApp count:", prevCount + 1);
                return prevCount + 1;
              });
              break;
            case "instagram":
              setInsta((prevCount) => prevCount + 1);
              break;
            case "facebook":
              setFacebook((prevCount) => prevCount + 1);
              break;
            default:
              break;
          }

          seenIds.add(item._id); // Mark this ID as seen
        });

        setData(Customers.data || []);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-evenly">
        <motion.div
          className="w-1/4 flex flex-col justify-center items-center bg-blue-200 p-5 rounded-xl gap-5 transition-transform transform hover:rotate-[-5deg] hover:rotate[-5deg] cursor-pointer shadow-xl"
          // initial={{ x: '-100vw' }}
          // animate={{
          // 	x: 0,
          // 	type: 'spring',
          // 	stiffness: 1000,
          // 	damping: 10,
          // 	duration: 2,
          // }}
          whileHover={{ rotate: -6 }}
          // transition={{ ease: 'easein', duration: 2 }}
        >
          <div className="flex items-center justify-between w-full">
            <h1 className="font-semibold text-black text-md">Facebook</h1>
            <h1 className="font-semibold text-green-600 ">+2.75%</h1>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="text-3xl font-semibold text-black ">
                {facebook || 0}
                <p className="text-slate-700">Customers</p>
              </h1>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="w-1/4 flex flex-col justify-center items-center bg-[#F56040] p-5 rounded-xl gap-5 transition-transform transform  cursor-pointer shadow-2xl"
          whileHover={{ scale: 1.25 }}
          // initial={{ y: '-100vw' }}
          animate={{ y: 0 }}
          // transition={{ type: 'bounce', stiffness: 100, damping: 10 }}
        >
          <div className="flex items-center justify-between w-full">
            <h1 className="font-semibold text-black text-md">Instagram</h1>
            <h1 className="font-semibold text-green-600 ">+21%</h1>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="text-3xl font-semibold text-black ">
                {insta || 0}
                <p className="text-slate-700">Customers</p>
              </h1>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="w-1/4 flex flex-col justify-center items-center bg-[#dcf8c6] p-5 rounded-xl gap-5 transition-transform transform hover:rotate-[-5deg] hover:rotate[-5deg] cursor-pointer shadow-xl"
          // initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          whileHover={{ rotate: 6 }}
        >
          <div className="flex items-center justify-between w-full">
            <h1 className="font-semibold text-black text-md">whatsapp</h1>
            <h1 className="font-semibold text-green-600 ">+0.75%</h1>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="text-3xl font-semibold text-black ">
                {whatsapp || 0}
                <p className="text-slate-700">Customers</p>
              </h1>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
