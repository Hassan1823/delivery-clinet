import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { backendLink } from "../../../../lib/data";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  salesChannel: yup.string().required("City is required"),
  socialUsername: yup.string().required("State is required"),
});
export const AddCustomer = ({ refresh }) => {
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
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userID = user ? user?._id : "";
      const response = await fetch(
        `${backendLink}/api/customer/createcustomer`,
        {
          method: "POST",
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
        console.log("customer added successful");
        const customer = await response.json();
        console.log("customer:", customer);
        toast.success(customer.message || "Success");
        refresh();
        reset();
      } else {
        console.error("failed failed");
        toast.error("Addition failed");
      }
      // Reset the form after successful submission (optional)
    } catch (error) {
      console.error("Error during product addition:", error);
    }
  };
  return (
    <>
      <button
        className="flex gap-1 px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl rounded-xl"
        onClick={() => document.getElementById("addcustomer").showModal()}
      >
        <IoMdAddCircleOutline className="text-2xl text-white" />
        Add Customer
      </button>
      <dialog id="addcustomer" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-[#E5E5E5]">
          <h3 className="text-lg font-bold">Add Customer Form</h3>

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
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
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
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
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
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>
            {/* Address text area Category */}
            <div className="flex justify-between gap-10 mx-20 my-4">
              <label htmlFor="address" className="block mb-2 text-sm font-bold">
                Address :
              </label>
              <div className="w-3/4 flex-flex-col">
                <textarea
                  id="address"
                  name="address"
                  className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                    errors.address ? "input-error" : ""
                  }`}
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
                Add Custoomer
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
    </>
  );
};
