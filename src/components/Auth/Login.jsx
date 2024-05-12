import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogged } = useAuthContext();
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
      const response = await fetch("/api/auth/login", {
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
        if (user.status === "verified") {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsLogged(true);
          toast.success("Login successful");
          navigate("/dashboard");
        } else {
          toast.error("Please verify your email");
          navigate("/confirmotp");
        }
      } else {
        console.error("Login failed");
        toast.error("Login failed");
      }

      reset(); // Reset the form after successful submission (optional)
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <>
      <div className="hero min-h-screen bg-[#E5E5E5]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="flex justify-center items-center text-2xl font-bold gradient-text pt-2">
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
                  <Link to="/forgot-password" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
                <label className="label">
                  <Link to="/signup" className="label-text-alt link link-hover">
                    Don't have an account? Sign up
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};