import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { backendLink } from "../../../lib/data";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, and be at least 8 characters long"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  gender: yup.string().required("check anyone"),
  role: yup.string().required("Please Select The Role"),
});

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
      setIsLoading(true);
      const response = await fetch(`${backendLink}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      const responseData = await response.json();

      if (!response.ok) {
        // Log the error response for debugging
        console.error("Signup error response:", responseData);

        // Display a more specific error message if the server provides it
        const errorMessage =
          responseData.message || `Server error: ${response.status}`;
        throw new Error(errorMessage);
      } else {
        console.log("Signup successful:", responseData);

        navigate("/confirmotp");
        toast.success("Signup successful");
        reset();
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error during signup:", error.message);
      toast.error(`${error.message}`);
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="hero min-h-screen bg-[#E5E5E5]">
        <div className="flex-col w-full hero-content lg:flex-row-reverse">
          <div className="w-1/2 shadow-2xl card shrink-0 bg-base-100">
            <div className="flex items-center justify-center pt-2 text-2xl font-bold gradient-text">
              Sign up
            </div>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full name:</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className={`input input-bordered ${
                    errors.fullName ? "input-error" : ""
                  }`}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-error">{errors.fullName.message}</p>
                )}
              </div>

              {/* Username */}
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

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email:</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className={`input input-bordered ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-error">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
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
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`input input-bordered ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-error">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Gender */}
              {/* <div className="form-control w-fit">
                <label className="cursor-pointer label ">
                  <span className="label-text">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="radio checked:bg-red-500"
                    {...register("gender")}
                  />
                  {errors.gender && (
                    <p className="text-error">{errors.gender.message}</p>
                  )}
                </label>
                <label className="cursor-pointer label">
                  <span className="label-text">Female</span>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="radio checked:bg-red-500"
                    {...register("gender")}
                  />
                  {errors.gender && (
                    <p className="text-error">{errors.gender.message}</p>
                  )}
                </label>
              </div> */}

              {/* Select gender */}
              <div className="form-control w-fit">
                <label className="cursor-pointer label">
                  <span className="label-text">Select Gender</span>
                </label>
                <div className="flex space-x-4">
                  <label className="cursor-pointer label">
                    <span className="mr-2 label-text">Male</span>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="radio checked:bg-red-500"
                      {...register("gender")}
                    />
                    {errors.gender && (
                      <p className="text-error">{errors.gender.message}</p>
                    )}
                  </label>
                  <label className="cursor-pointer label">
                    <span className="mr-2 label-text">Female</span>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="radio checked:bg-red-500"
                      {...register("gender")}
                    />
                    {errors.gender && (
                      <p className="text-error">{errors.gender.message}</p>
                    )}
                  </label>
                </div>
              </div>

              {/* Select Role */}
              <div className="form-control w-fit">
                <label className="cursor-pointer label">
                  <span className="label-text">Select Role</span>
                </label>
                <div className="flex space-x-4">
                  <label className="cursor-pointer label">
                    <span className="mr-2 label-text">User</span>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      className="radio checked:bg-red-500"
                      {...register("role")}
                    />
                    {errors.role && (
                      <p className="text-error">{errors.role.message}</p>
                    )}
                  </label>
                  <label className="cursor-pointer label">
                    <span className="mr-2 label-text">Admin</span>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      className="radio checked:bg-red-500"
                      {...register("role")}
                    />
                    {errors.role && (
                      <p className="text-error">{errors.role.message}</p>
                    )}
                  </label>
                </div>
              </div>

              {/* Already have an account? Login */}
              <label className="label">
                <Link to="/login" className="label-text-alt link link-hover">
                  Already have an account? Login
                </Link>
              </label>

              {/* Submit Button */}
              <div className="mt-6 form-control">
                <button type="submit" className="btn btn-primary">
                  {isLoading ? "Loading ..." : "Sign up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
