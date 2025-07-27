"use client";

import { Formik, Form } from "formik";
import { LoginSchema } from "@/schemas/LoginSchema";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

const init = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Formik
        initialValues={init}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          setLoading(true);
          const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          if (res?.ok && res.url && searchParams.get("callbackUrl")) {
            setLoading(false);
            toast.success("Successfully Logged In !", {
              id: "success",
            });
            router.push(searchParams.get("callbackUrl") as string);
          } else {
            setLoading(false);
            toast.error(res?.error || "Login failed. Please try again.", {
              id: "error",
            });
          }
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <div className="flex flex-col gap-3">
              <div>
                <h3>Email Address</h3>
                <input
                  className="input input-bordered input-primary w-full"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email Address"
                  required
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-red-800 mt-2 text-sm">
                    {errors.email}
                  </div>
                )}
              </div>
              <div>
                <h3>Password</h3>
                <input
                  className="input input-bordered input-primary w-full"
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  required
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="text-red-800 mt-2 text-sm">
                    {errors.password}
                  </div>
                )}
              </div>
              <button
                className={"btn btn-primary"}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <p className="loading loading-spinner text-red-500"></p>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
