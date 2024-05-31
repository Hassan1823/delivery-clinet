import React, { useEffect, useState } from "react";
import { NavBar } from "../Navbar/NavBar";
import { Footer } from "../Footer/Footer";
import { useParams } from "react-router-dom";
import { backendLink } from "../../../lib/data";

export const DetailOrder = () => {
  const { orderid } = useParams();
  const [order, setOrder] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(
        `${backendLink}/api/shipping/shippingStatus/${orderid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Something Went Wrong");
      } else {
        const order = await response.json();

        setOrder(order.data || []);

        if (
          order?.data?.status === "pending" ||
          order?.data?.status === "Ready to send"
        ) {
          setIndex(1);
        } else if (order?.data?.status === "Prepare to send") {
          setIndex(2);
        } else if (order?.data?.status === "Get into the system") {
          setIndex(3);
        } else if (
          order?.data?.status === "Delivered to your city" ||
          order?.data?.status === "Delivery"
        ) {
          setIndex(4);
        } else if (
          order?.data?.status === "The customer receive the items" ||
          order?.data?.status === "The customer receives the items"
        ) {
          setIndex(5);
        } else if (order?.data?.status === "Return origin") {
          setIndex(6);
        } else if (
          order?.data?.status === "Cancelled" ||
          order?.data?.status === "Cancel"
        ) {
          setIndex(7);
        } else {
          setIndex(1);
        }
        console.log(order);
      }
    };

    if (orderid) {
      fetchOrder();
    }
  }, [orderid]);

  return (
    <>
      <NavBar />
      <>
        <div className="min-h-screen bg-[#E5E5E5]">
          <div className="flex justify-center text-5xl font-bold text-[#282828]">
            Tracking ID # {orderid}
          </div>
          <ul className="mt-10 timeline timeline-vertical">
            <li>
              <div className="timeline-start timeline-box">Ready to Send</div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-primary"
                >
                  <path
                    fillRule={index > 0 && "evenodd"}
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <hr className="bg-primary" />
            </li>

            <li>
              <hr className="bg-primary" />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-primary"
                >
                  <path
                    fillRule={index > 1 && "evenodd"}
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">Prepare to send</div>
              <hr className="bg-primary" />
            </li>
            {/* {index > 1 && ( */}
            <li>
              <hr className="bg-primary" />
              <div className="timeline-start timeline-box">
                Get into the system
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-primary"
                >
                  <path
                    fillRule={index > 2 && "evenodd"}
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <hr />
            </li>
            {/* )} */}

            {/* {index > 2 && ( */}
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule={index > 3 && "evenodd"}
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">
                Delivered to your city{" "}
              </div>
              <hr />
            </li>
            {/* )} */}

            {/* {index > 3 && ( */}
            <li>
              <hr />
              <div className="timeline-start timeline-box">
                The customer receive the items
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule={index > 4 && "evenodd"}
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </li>

            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule={index > 5 && "evenodd"}
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">Return origin</div>
              <hr />
            </li>
            {index > 6 && (
              <li>
                <hr />
                <div className="timeline-start timeline-box">Cancelled</div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule={index > 6 && "evenodd"}
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </li>
            )}
            {/* )} */}
          </ul>
          <div className="flex flex-col items-center justify-center mt-20 ">
            <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-pink-600">
              {/* write content about tracking shippmemt   */}
              <p className="mb-8 text-lg text-center text-white">
                Your order Status is {order?.status || "pending"}
              </p>
              <p className="mb-8 text-lg text-white">
                Your order is on the way to you and will be delivered soon
              </p>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
};
