import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TrackOrder = () => {
  const [value, setvalue] = useState("");
  const naigate = useNavigate();

  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  const handleSubmit = () => {
    naigate(`/orders/${value}`);

    setvalue("");
  };
  return (
    <>
      <div className="bg-[#E5E5E5]">
        <section className="min-h-screen pt-12 lg:pt-24 ">
          <div className="text-white bg-yellow-600 -skew-y-1">
            <div className="container mx-auto skew-y-1">
              <div className="flex flex-col items-center py-10 text-center lg:py-20">
                <div className="w-full px-4 lg:w-1/2 lg:px-0">
                  <div className="mb-8">
                    <h2 className="mb-3 text-3xl font-bold lg:text-4xl">
                      Looking for Your Order?
                    </h2>
                    <p className="text-lg lg:text-xl opacity-80">
                      Track your order here
                    </p>
                  </div>
                  <div className="mb-10">
                    <div className="relative">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        <input
                          type="search"
                          name="search"
                          placeholder="Search here for threads"
                          className="w-full p-4 pl-10 text-gray-600 border-gray-100 rounded"
                          value={value}
                          onChange={handleChange}
                        />

                        <button
                          className="mt-10 text-black bg-white btn"
                          type="submit"
                        >
                          search
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
