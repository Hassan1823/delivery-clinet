import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { AddProduct } from "./AddProduct";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FloatButton } from "antd";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Hourglass } from "react-loader-spinner";
import { backendLink } from "../../../../lib/data";
const schema = yup.object().shape({
  name: yup.string().required("Product Name is required"),
  price: yup.number().required("Price is required"),

  category: yup.string().required("Category is required"),
  quantity: yup.number().required("Quantity is required"),
  weight: yup.number().required("Weight is required"),
});
export const InventoryMain = () => {
  const [products, setProducts] = useState([]);
  const [updateProductID, setUpdateProductID] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendLink}/api/product/getproducts`);
      if (response.ok) {
        const products = await response.json();
        // console.log(products);
        setProducts(products);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during product addition:", error);
    }
  };

  const onDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      onOk: () => {
        fetch(`${backendLink}/api/product/deleteproduct/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          console.log("res", res);
          if (res.ok) {
            console.log("deleted successful");
            toast.success("delete successful");
            fetchProducts();
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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [updateProductID]);

  const downloadCSV = () => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const fileName = `products_${currentDate}.csv`; // Add date to the file name

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Price,Category,Quantity,Weight,Created At,Updated At\n" + // Add titles
      products
        .map(
          (product) =>
            `${product.name},${product.price},${product.category},${product.quantity},${product.weight},${product.createdAt},${product.updatedAt}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    toast.success("download successful");
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
    try {
      const response = await fetch(
        `${backendLink}/api/product/updateproduct/${updateProductID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log("Product updated successful");
        const product = await response.json();
        console.log("Product:", product);
        toast.success("Product updated successful");
        setUpdateProductID("");
        reset();
      } else {
        console.error("update failed");
        toast.error("update failed");
      }
    } catch (error) {
      console.error("Error during product addition:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full min-h-screen gap-5 px-20 py-10 text-black">
        <div className="flex items-center justify-between">
          <div className="text-2xl">All products</div>
          <div className="max-w-xs text-lg breadcrumbs">
            <ul>
              <li>Dashboard</li>
              <li>Inventory</li>
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
            <AddProduct refresh={fetchProducts} />
          </div>
          <div className="flex bg-inherit bg-slate-50">
            <input
              className="w-full input input-bordered join-item bg-slate-50"
              placeholder="search"
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
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Weight</th>
                    <th>Selling Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* rows */}
                  {/* check if have product  otherwise show no product */}
                  {products.length === 0 ? (
                    <div className="flex justify-center w-full text-xl font-semibold">
                      No Product found
                    </div>
                  ) : (
                    <>
                      {products.map((product, index) => (
                        <>
                          <tr
                            key={product._id}
                            style={{
                              backgroundColor:
                                product.quantity < 10 ? "#ffcccb" : "inherit",
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>{product?.name}</td>
                            <td>{product?.category}</td>
                            <td>{product?.quantity}</td>
                            <td>{product?.weight}</td>
                            <td>RS. {product?.price}</td>

                            <td>
                              <div className="flex gap-3">
                                <button
                                  className="px-4 py-2 shadow-2xl  rounded-xl"
                                  onClick={() => {
                                    setUpdateProductID(product?._id);
                                    document
                                      .getElementById("updateproduct")
                                      .showModal();
                                  }}
                                >
                                  <FaEdit className="text-2xl text-yellow-600" />
                                </button>
                                <button
                                  className="px-4 py-2 shadow-2xl  rounded-xl"
                                  onClick={() => {
                                    onDelete(product?._id);
                                  }}
                                >
                                  <MdOutlineDeleteSweep className="text-2xl text-red-600 " />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Weight</th>
                    <th>Selling Price</th>
                    <th>Actions</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
        <dialog id="updateproduct" className="modal">
          <div className="modal-box w-11/12 max-w-5xl bg-[#E5E5E5]">
            <h3 className="text-lg font-bold">Update product Form</h3>

            <form
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              {/* Product Name */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label htmlFor="name" className="block mb-2 text-sm font-bold">
                  Product Name :
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                    errors.name ? "input-error" : ""
                  }`}
                  {...register("name")}
                />
              </div>

              {/* Product Price */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label htmlFor="price" className="block mb-2 text-sm font-bold">
                  Price :
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                    errors.price ? "input-error" : ""
                  }`}
                  {...register("price")}
                />
              </div>

              {/* Product Category */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-bold"
                >
                  Category :
                </label>

                <input
                  type="text"
                  id="category"
                  name="category"
                  className={`border-2 rounded-lg py-2 px-3 w-3/4  bg-white  ${
                    errors.category ? "input-error" : ""
                  }`}
                  {...register("category")}
                />
              </div>

              {/* Product Quantity */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-bold"
                >
                  Quantity :
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                    errors.quantity ? "input-error" : ""
                  }`}
                  {...register("quantity")}
                />
              </div>

              {/* Product Weight */}
              <div className="flex justify-between gap-10 mx-20 my-4">
                <label
                  htmlFor="weight"
                  className="block mb-2 text-sm font-bold"
                >
                  Weight (in grams) :
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
                    errors.weight ? "input-error" : ""
                  }`}
                  {...register("weight")}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex gap-1 px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl rounded-xl"
                >
                  Update Product
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
