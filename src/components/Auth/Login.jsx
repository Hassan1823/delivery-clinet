import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { adminLink, backendLink } from "../../../lib/data";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogged } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const response = await fetch(`${backendLink}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Login successful");
        const user = await response.json();
        console.log(user);
        // if (user.data.role === "admin") {
        // }
        if (user.data.status === "verified") {
          if (user.data.isVerified === false) {
            toast.error("Please Wait Until Admin Approval");
            navigate("/");
            return;
          }
          localStorage.setItem("user", JSON.stringify(user.data));
          setUser(user);
          setIsLogged(true);
          toast.success("Login successful");
          if (user.data.role === "admin" || user.data.role === "Admin") {
            window.location.href = `${adminLink}/${user?.data._id}`;
            localStorage.setItem("admin", JSON.stringify(user.data));
            return;
          }
          navigate("/dashboard");
        } else if (user.data.status === "admin unverified") {
          toast.success("Please Wait Until Admin Approval");
          navigate("/");
        } else {
          toast.error("Please verify your email");
          navigate("/confirmotp");
        }
      } else {
        console.error("Login failed");
        toast.error("Login failed");
      }

      reset(); // Reset the form after successful submission (optional)
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error during login:", error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#E5E5E5]">
        <div className="flex-col w-1/3 hero-content lg:flex-row-reverse">
          <div className="w-full shadow-2xl shrink-0 bg-base-100">
            <div className="flex items-center justify-center pt-2 text-2xl font-bold gradient-text">
              log in
            </div>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username:</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className={`input input-bordered ${
                    errors.username ? "input-error" : ""
                  }`}
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-error">{errors.username.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password:</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className={`input input-bordered ${
                    errors.password ? "input-error" : ""
                  }`}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-error">{errors.password.message}</p>
                )}
                <label className="label">
                  <Link
                    to="/forgot-password"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </Link>
                </label>
                <label className="label">
                  <Link to="/signup" className="label-text-alt link link-hover">
                    {`Don't have an account? Sign up`}
                  </Link>
                </label>
              </div>
              <div className="mt-6 form-control">
                <button type="submit" className="btn btn-primary">
                  {isLoading ? "Loading ..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
