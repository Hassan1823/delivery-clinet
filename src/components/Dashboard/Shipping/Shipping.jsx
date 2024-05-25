import React, { useEffect, useState } from "react";
// import { FaShippingFast, FaEdit } from 'react-icons/fa';
// import { MdOutlineDeleteSweep } from 'react-icons/md';
// import { IoMdAddCircleOutline } from 'react-icons/io';
import { FloatButton } from "antd";
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { Hourglass } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { backendLink } from "../../../../lib/data";
import { AddShipping } from "./AddShipping";
import toast from "react-hot-toast";

export const Shipping = () => {
  const [shippings, setShippings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnValue, setBtnValue] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  const btnData = [
    "All",
    "Ready to Sen",
    "Prepare to send",
    "Get into the system",
    "delivery",
    "the customers recieve the items",
    "return orign",
    "cancel",
  ];

  const fetchShippings = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user?._id : "";
      const response = await fetch(
        `${backendLink}/api/shipping/view-shippings/${userId}`
      );
      if (response.ok) {
        const shippings = await response.json();
        console.log(shippings);
        setShippings(shippings);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error during product addition:", error);
    }
  };

  const generateChallanPDF = (data) => {
    console.log(data);
    const doc = new jsPDF("landscape");
    // const currentTime = new Date().toLocaleString();
    // const unixtime = new Date().getTime();

    // Create a label to print out the shipping detail in the center of the page with a border
    doc.text("Shipping Label", 105, 10, { align: "center" });

    // Generate barcode
    const barcodeValue = data._id;
    const barcodeOptions = {
      format: "CODE128",
      displayValue: true,
      fontSize: 10,
      width: 2,
      height: 30,
      text: barcodeValue, // Display the tracking ID number as text below the barcode
    };
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, barcodeValue, barcodeOptions);
    const barcodeDataURL = barcodeCanvas.toDataURL();

    // Add barcode image to the PDF document
    doc.addImage(barcodeDataURL, "PNG", 10, 20, 100, 50);

    // Then, display the tracking number itself with a heading "Tracking No" and the tracking number
    doc.text("Tracking No", 10, 80);
    doc.text(data._id, 10, 90);

    // Display the shipping details
    doc.text("Shipping Details", 10, 100);
    doc.text(`Brand : ${data.brand}`, 10, 110);
    doc.text(`Customer : ${data.customer.name}`, 10, 120);
    doc.text(`Phone : ${data.customer.phone}`, 10, 130);
    doc.text(`Shipping Cost : ${data.totalPrice}`, 10, 140);
    doc.text(`Quantity : ${data.quantity}`, 10, 150);
    doc.text(`Weight : ${data.totalWeight / 1000} kg`, 10, 160);
    doc.text(`Shipping : ${data.brand}`, 10, 170);
    doc.text(`Tracking No : ${data._id}`, 10, 180);
    const qrCodeCanvas = document.createElement("canvas");
    const qrCodeValue = JSON.stringify(data);
    const qrCodeOptions = {
      width: 50,
      height: 50,
    };
    QRCode.toCanvas(qrCodeCanvas, qrCodeValue, qrCodeOptions, function (error) {
      if (error) {
        console.error("Error generating QR code:", error);
        return;
      }
      const qrCodeDataURL = qrCodeCanvas.toDataURL();

      // Add QR code image to the PDF document at the bottom
      doc.addImage(qrCodeDataURL, "PNG", 10, 250, 50, 50);

      doc.save(`shipping-${data._id}.pdf`);
    });

    // doc.save(`shipping-${data._id}.pdf`);
  };

  // add download csv function

  const downloadeCSV = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const fileName = `shipping_${currentDate}.csv`;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Time,Customer,Phone,Shipping Cost,Quantity,Weight,shipping,tracking no \n" +
      shippings
        .map(
          (shipping) =>
            `${new Date(shipping.createdAt).toLocaleString()},${
              shipping.customer.name
            },${shipping.customer.phone},${shipping.totalPrice},${
              shipping.quantity
            },${shipping.totalWeight / 1000} kg,${shipping.brand},${
              shipping._id
            }`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    fetchShippings();
  }, []);

  useEffect(() => {
    // Define a mapping of button values to status strings
    const statusMapping = {
      All: undefined, // No filtering
      "Ready to Sen": "ready",
      "Prepare to send": "prepare",
      "Get into the system": "system",
      delivery: "delivery",
      "the customers receive the items": "received",
      "return origin": "return",
      cancel: "cancel",
    };

    // Get the status string from the mapping based on btnValue
    const statusFilter = statusMapping[btnValue];

    // Filter the shippings array based on the statusFilter
    const filteredShippings = shippings.filter((shipping) => {
      // Return true if there's no specific status to filter by (e.g., "All")
      if (!statusFilter) return true;
      // Compare the shipping.status to the statusFilter
      return shipping.status === statusFilter;
    });

    // Set the filtered data
    setData(filteredShippings);
  }, [btnValue, shippings]);

  useEffect(() => {
    console.log(searchValue ? searchValue : "no searchValue");
    const searchProducts = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user ? user?._id : "";
        const response = await fetch(
          `${backendLink}/api/shipping/searchShippings/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: searchValue,
            }),
          }
        );

        if (!response.ok) {
          toast.error("Something went wrong");
          fetchShippings();
        } else {
          const res = await response.json();
          console.log(res.shippings);
          setData(res.shippings);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        fetchShippings();
        setLoading(false);
      }
    };
    if (searchProducts && searchValue !== "") {
      searchProducts();
    } else {
      fetchShippings();
    }
  }, [searchValue]);
  return (
    <>
      <div
        id="shipping"
        className="flex flex-col w-full min-h-screen gap-5 px-20 py-10 text-black"
      >
        <div className="flex items-center justify-between">
          <div className="text-2xl">All Customers</div>
          <div className="max-w-xs text-lg breadcrumbs">
            <ul>
              <li>Dashboard</li>
              <li>Shipping</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-5 rounded-lg shadow-xl bg-slate-50">
          <div className="overflow-x-auto">
            <div className="flex items-center gap-3">
              {btnData?.map((item, idx) => {
                return (
                  <button
                    key={idx}
                    className="badge indicator"
                    onClick={() => setBtnValue(item)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5 rounded-lg shadow-xl bg-slate-50">
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl rounded-xl "
              onClick={downloadeCSV}
            >
              Download CSV
            </button>
            <AddShipping refresh={fetchShippings} />
          </div>
          <div className="flex bg-inherit bg-slate-50">
            <input
              className="w-full input input-bordered join-item bg-slate-50"
              placeholder="search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {loading ? (
            <>
              <div className="flex justify-center">
                <Hourglass
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={["#CA8A04", "#000000"]}
                />
              </div>
            </>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Time</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Total Cost</th>
                    <th>Quantity</th>
                    <th>Weight</th>
                    <th>shipping</th>
                    <th>tracking no</th>
                    <th>Download Label</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  {data.length === 0 ? (
                    <div className="flex justify-center w-full text-xl font-semibold">
                      No Shipping found
                    </div>
                  ) : (
                    <>
                      {data.map((shipping, index) => (
                        <tr key={shipping?._id}>
                          <td>{index + 1}</td>

                          {/* formate the time  */}
                          <td>
                            {new Date(shipping?.createdAt).toLocaleString()}
                          </td>

                          <td>{shipping?.customer?.name}</td>
                          <td>{shipping?.customer?.phone}</td>
                          <td>{shipping?.totalPrice}</td>
                          <td>{shipping?.quantity}</td>
                          <td>
                            {(shipping?.totalWeight / 1000).toFixed(4)} kg
                          </td>
                          <td>{shipping?.brand}</td>

                          {/* add dynamic routing to the tracking number */}
                          <td>
                            <Link to={`/orders/${shipping?._id}`}>
                              {shipping?._id}
                            </Link>
                          </td>

                          <td>
                            <button
                              className="px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl rounded-xl "
                              onClick={() => generateChallanPDF(shipping)}
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Time</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Total Cost</th>
                    <th>Quantity</th>
                    <th>Weight</th>
                    <th>shipping</th>
                    <th>tracking no</th>
                    <th>Download Label</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
      <FloatButton.BackTop />
    </>
  );
};
