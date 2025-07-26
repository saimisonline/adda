"use client";

import { Formik, Form } from "formik";
import { SignupSchema } from "@/schemas/SignupSchema";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const init = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  pic: "",
};

const Signup = () => {
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Formik
        initialValues={init}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          setLoading(true);
          if (values.pic) {
            // const data = new FormData();
            // data.append("file", values.pic);
            // data.append("upload_preset", "CodeWithSaim");
            // data.append("cloud_name", "codewithsaim");
            // data.append("folder", "Users");
            // const img = await axios.post(
            //   "https://api.cloudinary.com/v1_1/codewithsaim/image/upload",
            //   data
            // );
            // setPic(img.data.url.toString());
          } else {
            setPic("");
          }
          const response = await axios.post("/api/auth/signup", {
            ...values,
            pic,
          });
          if (!response.data.error) {
            setLoading(false);
            toast.success("You Can Login Now !", {
              id: "success",
            });
          } else {
            setLoading(false);
            toast.error(response.data.error, {
              id: "error",
            });
          }
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          // setFieldValue
        }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <div className="flex flex-col gap-3">
              <div>
                <h3>Name</h3>
                <input
                  className="input input-bordered input-primary w-full"
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={values.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <h3>Email Address</h3>
                <input
                  className="input input-bordered input-primary w-full"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email Address"
                  value={values.email}
                  onChange={handleChange}
                  required
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
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <div className="text-red-800 mt-2 text-sm">
                    {errors.password}
                  </div>
                )}
              </div>
              <div>
                <h3>Confirm Password</h3>
                <input
                  className="input input-bordered input-primary w-full"
                  name="cpassword"
                  type="password"
                  placeholder="Enter Your Password Again"
                  value={values.cpassword}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
                {errors.cpassword && (
                  <div className="text-red-800 mt-2 text-sm">
                    {errors.cpassword}
                  </div>
                )}
              </div>
              {/* <div>
                <h3>Select Your Profile Picture ( Optional )</h3>
                <input
                  className="file-input file-input-bordered file-input-primary w-full"
                  name="pic"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const file = (e.target as any).files[0];
                    setFieldValue("pic", file);
                  }}
                />
              </div> */}
              <button
                className={"btn btn-primary"}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <p className="loading loading-spinner text-red-500"></p>
                ) : (
                  "Signup"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Signup;
