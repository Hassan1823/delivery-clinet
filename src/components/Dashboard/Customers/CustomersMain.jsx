import React, { useEffect, useState } from "react";
import { FaShippingFast, FaEdit } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AddCustomer } from "./AddCustomer";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "antd";
import toast from "react-hot-toast";
import { Hourglass } from "react-loader-spinner";
import { backendLink } from "../../../../lib/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// ~ schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  salesChannel: yup.string().required("City is required"),
  socialUsername: yup.string().required("State is required"),
});

export const CustomersMain = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomers, setCurrentCustomers] = useState([]);
  const [updateCustomerID, setUpdateCustomerID] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCustomers();
  }, []);

  // * fetch customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `${backendLink}/api/customer/getcustomers/${user?._id}`
      );
      if (response.ok) {
        const Customers = await response.json();
        //   console.log(Customers);
        setCustomers(Customers.data || []);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error during customers addition:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [updateCustomerID]);
  //   console.log(customers ? customers : "no customers");

  // * delete customers
  const onDelete = (id) => {
    Modal.confirm({
      title:
        "Are you sure you want to delete? associated details will be effect (shipping)",
      onOk: () => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const userID = user ? user?._id : "";
        fetch(`${backendLink}/api/customer/deletecustomer/${id}/${userID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          console.log("res", res.message);
          if (res.ok) {
            console.log("deleted successful");
            toast.success("deleted successful");
            fetchCustomers();
          } else {
            console.log("deleted failed");
            toast.error("deleted failed");
          }
        });
      },
      okText: "Delete",
      maskClosable: true,
      okButtonProps: {
        style: {
          backgroundColor: "red",
        },
      },
    });
  };

  // * download customers
  const downloadCSV = () => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const fileName = `customers_${currentDate}.csv`; // Add date to the file name

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Phone,Address,Delivery,Sales Channel, social Username, Created at \n" + // Add titles
      customers
        .map(
          (customer) =>
            `${customer.name},${customer.phone},${customer.address},${customer.delivery},${customer.salesChannel},${customer.socialUsername},${customer.createdAt}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    toast.success(" Download successful ");
  };

  // * updating customer starts here
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    event.preventDefault();

    console.log("data :::", data);
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const userID = user ? user?._id : "";

      const response = await fetch(
        `${backendLink}/api/customer/updatecustomer/${updateCustomerID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            salesChannel: data.salesChannel,
            socialUsername: data.socialUsername,
            userID: userID,
          }),
        }
      );
      if (response.ok) {
        const customer = await response.json();
        console.log("customer ::", customer);
        toast.success("Customer Updated Successfully");
        setUpdateCustomerID("");
        reset();
      } else {
        console.error("Updating Customer Error");
        toast.error("Updating Customer Failed");
      }
    } catch (error) {
      console.error("Error during product addition:", error);
    }
  };

  // console.log(currentCustomers ? currentCustomers : "no currentCustomers");

  useEffect(() => {
    console.log(searchValue ? searchValue : "no searchValue");
    const searchProducts = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user ? user?._id : "";
        const response = await fetch(
          `${backendLink}/api/customer/searchCustomers/${userId}`,
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
          fetchCustomers();
        } else {
          const res = await response.json();
          console.log(res.customers);
          setCustomers(res.customers);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        fetchCustomers();
        setLoading(false);
      }
    };
    if (searchProducts && searchValue !== "") {
      searchProducts();
    } else {
      fetchCustomers();
    }
  }, [searchValue]);

  return (
    <>
      <div className="flex flex-col w-full min-h-screen gap-5 px-20 py-10 text-black">
        <div className="flex items-center justify-between">
          <div className="text-2xl">All Customers</div>
          <div className="max-w-xs text-lg breadcrumbs">
            <ul>
              <li>Dashboard</li>
              <li>Customers</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5 rounded-lg shadow-xl bg-slate-50">
          <div className="flex justify-between">
            <button
              className="flex gap-1 px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl rounded-xl"
              onClick={downloadCSV}
            >
              Download CSV
            </button>
            <AddCustomer refresh={fetchCustomers} />
          </div>
          <div className="flex bg-inherit bg-slate-50">
            <input
              className="w-full input input-bordered join-item bg-slate-50"
              placeholder="search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {loading ? (
            <></>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customr Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Delivery</th>
                    <th>sales chanel</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* rows */}
                  {!customers || customers.length === 0 ? (
                    <div className="flex justify-center w-full text-xl font-semibold">
                      No Customer found
                    </div>
                  ) : (
                    <>
                      {customers.map((customer, index) => (
                        <tr
                          key={customer._id}
                          className={`${
                            customer?.cancelOrders > 2 && "bg-[#ffcccb]"
                          }`}
                        >
                          <td>{index + 1}</td>
                          <td>
                            <div className="font-bold">{customer?.name}</div>
                          </td>
                          <td>{customer?.email}</td>
                          <td>{customer?.phone}</td>
                          <td>{customer?.address}</td>

                          <td>{customer?.delivery || 0}</td>
                          <td>{customer?.salesChannel}</td>

                          <td>
                            <div className="flex gap-3">
                              <button
                                className="px-4 py-2 shadow-2xl rounded-xl"
                                onClick={() => {
                                  console.log("Opening dialouge");
                                  setUpdateCustomerID(customer?._id);
                                  setCurrentCustomers(customer);
                                  document
                                    .getElementById("updatecustomer")
                                    .showModal();
                                }}
                              >
                                <FaEdit className="text-2xl text-yellow-600" />
                              </button>
                              <button
                                className="px-4 py-2 shadow-2xl rounded-xl"
                                onClick={() => {
                                  onDelete(customer?._id);
                                }}
                              >
                                <MdOutlineDeleteSweep className="text-2xl text-red-600 " />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Customr Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Delivery</th>
                    <th>sales chanel</th>

                    <th>Actions</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* updating customers starts here  */}
        <dialog id="updatecustomer" className="modal">
          <div className="modal-box w-11/12 max-w-5xl bg-[#E5E5E5]">
            <h3 className="text-lg font-bold">Update Customer Form</h3>

            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              {/* customer name */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label htmlFor="name" className="block mb-2 text-sm font-bold">
                  Customer Name :
                </label>
                <div className="w-3/4 flex-flex-col">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                      errors.name ? "input-error" : ""
                    }`}
                    placeholder={currentCustomers.name || ""}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
              {/* customer email */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label htmlFor="email" className="block mb-2 text-sm font-bold">
                  Email :
                </label>
                <div className="w-3/4 flex-flex-col">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder={currentCustomers.email || ""}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              {/* customer Phone */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label htmlFor="phone" className="block mb-2 text-sm font-bold">
                  Phone :
                </label>
                <div className="w-3/4 flex-flex-col">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                      errors.phone ? "input-error" : ""
                    }`}
                    placeholder={currentCustomers.phone || ""}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Address text area Category */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-bold"
                >
                  Address :
                </label>
                <div className="w-3/4 flex-flex-col">
                  <textarea
                    id="address"
                    name="address"
                    className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                      errors.address ? "input-error" : ""
                    }`}
                    placeholder={currentCustomers.address || ""}
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
              {/* sale channal select field   */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label
                  htmlFor="salesChannel"
                  className="block mb-2 text-sm font-bold"
                >
                  Sales Channel :
                </label>
                <div className="w-3/4 flex-flex-col">
                  {" "}
                  <select
                    id="salesChannel"
                    name="salesChannel"
                    className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                      errors.salesChannel ? "input-error" : ""
                    }`}
                    placeholder={currentCustomers.salesChannel || ""}
                    {...register("salesChannel")}
                  >
                    <option value="facebook">Facebook</option>

                    <option value="whatsapp">Whatsapp</option>

                    <option value="instagram">Instagram</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.salesChannel && (
                    <p className="text-sm text-red-500">
                      {errors.salesChannel.message}
                    </p>
                  )}
                </div>
              </div>
              {/* social media username */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label
                  htmlFor="socialUsername"
                  className="block mb-2 text-sm font-bold"
                >
                  Social Username :
                </label>
                <div className="w-3/4 flex-flex-col">
                  <input
                    type="text"
                    id="socialUsername"
                    name="socialUsername"
                    className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                      errors.socialUsername ? "input-error" : ""
                    }`}
                    placeholder={currentCustomers.socialUsername || ""}
                    {...register("socialUsername")}
                  />
                  {errors.socialUsername && (
                    <p className="text-sm text-red-500">
                      {errors.socialUsername.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex gap-1 px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl rounded-xl"
                >
                  Update Customer
                </button>
              </div>
            </form>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="px-4 py-2 font-bold text-white bg-red-700 rounded-lg shadow-2xl btn">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <FloatButton.BackTop />
    </>
  );
};
