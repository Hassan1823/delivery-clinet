import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import DHL from "./dhl.png";
import TCS from "./tcs.png";
import Leopards from "./leop.png";
import { backendLink } from "../../../../lib/data";

import { Hourglass } from "react-loader-spinner";
// npm run dev
const schema = yup.object().shape({
  customerId: yup.string().required("Customer is required"),
  productId: yup.string().required("Product is required"),
  quantity: yup.string().required("Quantity is required"),
  shippingCost: yup.string().required("Shipping Cost is required"),
});

export const AddShipping = ({ refresh }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, isLoading] = useState(true);

  //   * fetch user products
  const fetchProducts = async () => {
    try {
      isLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user?._id : "";
      const response = await fetch(
        `${backendLink}/api/product/getproducts/${userId}`
      );
      if (response.ok) {
        const products = await response.json();
        // console.log(products);
        setProducts(products.data || []);
      }
      isLoading(false);
    } catch (error) {
      isLoading(false);
      console.error("Error during product addition:", error);
    }
  };

  //   * fetch user customers
  const fetchCustomers = async () => {
    try {
      isLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user?._id : "";
      const response = await fetch(
        `${backendLink}/api/customer/getcustomers/${userId}`
      );
      if (response.ok) {
        const Customers = await response.json();
        // console.log(Customers);
        setCustomers(Customers.data || []);
      }
      isLoading(false);
    } catch (error) {
      isLoading(false);
      console.error("Error during customers addition:", error);
    }
  };

  const handleImageSelect = (brandName) => {
    setSelectedImage(brandName === selectedImage ? null : brandName);
  };

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
    const { quantity, shippingCost } = data;

    // they must not be negetive
    if (quantity < 0 || shippingCost < 0) {
      toast.error("Quantity and Shipping Cost must be positive");
      return;
    }

    if (!selectedImage) {
      toast.error("Please select a brand");
      return;
    }
    console.log(data, selectedImage);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user?._id : "";
      const response = await fetch(
        `${backendLink}/api/shipping/create-shippment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            brandName: selectedImage,
            userId: userId,
          }),
        }
      );
      if (response.ok) {
        console.log("Shipping added successful");
        const shipping = await response.json();
        console.log("Shipping:", shipping);
        toast.success("Shipping addeFd successful");

        reset();
        setSelectedImage(null);

        refresh();
      } else {
        const shipping = await response.json();
        console.error("failed failed", shipping);

        toast.error(`The Max Product Quantity is ${shipping?.quantity}`);
      }
    } catch (error) {
      console.error("Error during shipping addition:", error);
    }
  };

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCustomers()]);
  }, []);
  return (
    <>
      <button
        className="flex gap-1 px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl rounded-xl"
        onClick={() => document.getElementById("addshipping").showModal()}
      >
        <IoMdAddCircleOutline className="text-2xl text-white" />
        Add Shipping
      </button>
      <dialog id="addshipping" className="modal">
        {loading ? (
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
        ) : (
          <>
            <div className="modal-box w-11/12 max-w-5xl bg-[#E5E5E5]">
              <h3 className="text-lg font-bold">Add Shipping Form</h3>

              <form
                className="flex flex-col"
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex justify-between gap-10 mx-20 my-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-bold"
                  >
                    Customer :
                  </label>

                  {/* select customer   */}
                  <div className={`flex flex-col  w-3/4 `}>
                    <select
                      id="customer"
                      name="customer"
                      className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 `}
                      {...register("customerId")}
                    >
                      <option value="">Select Customer</option>
                      {customers.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>

                    {errors.customerId && (
                      <p className="text-xs text-red-500">
                        {errors?.customerId?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between gap-10 mx-20 my-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-bold"
                  >
                    Product :
                  </label>

                  {/* select product  */}
                  <div className={`flex flex-col  w-3/4 `}>
                    <select
                      id="product"
                      name="product"
                      className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 `}
                      {...register("productId")}
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    {errors.productId && (
                      <p className="text-xs text-red-500">
                        {errors?.productId?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between gap-10 mx-20 my-4">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-bold"
                  >
                    Quantity :
                  </label>
                  <div className={`flex flex-col  w-3/4 `}>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 `}
                      {...register("quantity")}
                    />
                    {errors.quantity && (
                      <p className="text-xs text-red-500">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between gap-10 mx-20 my-4">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-bold"
                  >
                    Shipping Cost :
                  </label>
                  <div className={`flex flex-col  w-3/4 `}>
                    <input
                      type="number"
                      id="shipping_cost"
                      name="shipping_cost"
                      className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 `}
                      {...register("shippingCost")}
                    />
                    {errors.shippingCost && (
                      <p className="text-xs text-red-500">
                        {errors.shippingCost.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-10 mx-20 my-4">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-bold"
                  >
                    Brands
                  </label>
                  <div className="flex gap-4 mt-4">
                    {/* Sample images */}
                    <div className="relative">
                      <img
                        src={DHL}
                        alt="DHL"
                        className={`cursor-pointer ${
                          selectedImage?.includes("DHL")
                            ? "border-green-500"
                            : ""
                        }`}
                        width={150}
                        height={150}
                        onClick={() => handleImageSelect("DHL")}
                      />{" "}
                      {selectedImage?.includes("DHL") && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className="absolute w-6 h-6 text-green-500 top-2 right-2"
                        >
                          <path
                            fill="currentColor"
                            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
                          />
                        </svg>
                      )}
                    </div>
                    {/* Add more sample images here */}
                    <div className="relative">
                      <img
                        src={TCS}
                        alt="TCS"
                        className={`cursor-pointer ${
                          selectedImage?.includes("TCS")
                            ? "border-green-500"
                            : ""
                        }`}
                        onClick={() => handleImageSelect("TCS")}
                        width={150}
                        height={150}
                      />
                      {selectedImage?.includes("TCS") && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className="absolute w-6 h-6 text-green-500 top-2 right-2"
                        >
                          <path
                            fill="currentColor"
                            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="relative">
                      <img
                        src={Leopards}
                        alt="Leopards"
                        className={`cursor-pointer ${
                          selectedImage?.includes("Leopards")
                            ? "border-green-500"
                            : ""
                        }`}
                        onClick={() => handleImageSelect("Leopards")}
                        width={150}
                        height={150}
                      />
                      {selectedImage?.includes("Leopards") && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className="absolute w-6 h-6 text-green-500 top-2 right-2"
                        >
                          <path
                            fill="currentColor"
                            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
                          />
                        </svg>
                      )}
                    </div>
                    {/* Add more sample images here */}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="flex gap-1 px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl rounded-xl"
                  >
                    Add Shipping
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
          </>
        )}
      </dialog>
    </>
  );
};
