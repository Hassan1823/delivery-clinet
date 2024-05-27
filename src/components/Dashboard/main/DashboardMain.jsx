import React, { useEffect, useState } from "react";
import { Top } from "./Top.jsx";
import InventoryBarChart from "../Charts/InventoryBarChart .jsx";
import InventoryLevelChart from "../Charts/Areachart.jsx";
import Barchart from "../Charts/Barchart.jsx";
import SalesOverviewChart from "../Charts/Linechart.jsx";
import TopSellingProductsChart from "../Charts/StackedBarchart.jsx";
import { FloatButton } from "antd";
import { backendLink } from "../../../../lib/data.js";

export const DashboardMain = () => {
  const [products, setProducts] = useState([]);
  const [shippings, setShippings] = useState([]);

  // * fetching products
  const fetchProducts = async () => {
    try {
      // setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      // console.log(user ? user : "no user");

      if (user) {
        const response = await fetch(
          `${backendLink}/api/product/getproducts/${user?._id}`
        );
        if (response.ok) {
          const products = await response.json();
          // console.log(products);
          setProducts(products.data || []);
        }
      }
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.error("Error during product addition:", error);
    }
  };

  // * fetching shippings
  const fetchShippings = async () => {
    try {
      // setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user?._id : "";
      const response = await fetch(
        `${backendLink}/api/shipping/view-shippings/${userId}`
      );
      if (response.ok) {
        const shippings = await response.json();
        // console.log(shippings);
        setShippings(shippings);
      }
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.error("Error during product addition:", error);
    }
  };

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts();
    }
    if (!shippings || shippings.length === 0) {
      fetchShippings();
    }
  }, [products, shippings]);

  return (
    <>
      <div className="flex flex-col min-h-screen gap-10 px-20 py-10 text-black ">
        <Top />
        <div className="flex flex-col gap-10">
          <InventoryBarChart data={products} />
          <InventoryLevelChart data={products} />
          <Barchart data={shippings} />
          <SalesOverviewChart data={shippings} />
          <TopSellingProductsChart data={shippings} />
        </div>
        <FloatButton.BackTop />
      </div>
    </>
  );
};
