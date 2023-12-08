"use client";
import { BASE_URL } from "@/config";
import { LOGIN_USER } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "cookies";

interface userLogin {
  email: string;
  password: string;
}
export const Login = () => {
  const router = useRouter();
  const [loginfield, setLoginfield] = useState<userLogin>({
    email: "",
    password: "",
  });
  const [loginUse, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signinUser.token);
      setLoginfield({ email: "", password: "" });
      router.push("/profile");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginfield({ ...loginfield, [e.target.name]: e.target.value });
  };
  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginfield.email === "" || loginfield.password === "")
      return alert("Enter fields");
    await loginUse({
      variables: {
        email: loginfield.email,
        password: loginfield.password,
      },
    });
  };
  // {
  //   loading ? <div>loading</div> : "";
  // }
  // {
  //   error ? alert(error.message) : "";
  // }
  return (
    <>
      <div className=" min-h-screen flex items-baseline  justify-end bg-blue-400">
        <div className="bg-white  p-16 rounded shadow-2xl lg:w-2/4 md:w-3/4">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            Sign in to your Account
          </h2>
          <form onSubmit={handleSumbit} className="space-y-5">
            <div>
              <label className="block mb-1 font-bold text-gray-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={loginfield.email}
                onChange={inputHandle}
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-gray-500">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginfield.password}
                onChange={inputHandle}
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
              <button className="block w-full bg-yellow-400 hover:bg-yellow-300  p-4 rounded mt-6 text-yellow-900 hover:text-yellow-800 transition duration-300 ">
                Login
              </button>
              <div className="flex justify-between mt-2 selection:font-medium text-blue-600 dark:text-blue-500  ">
                <Link href="#" className="hover:underline">
                  Forgot Password
                </Link>
                <Link href="/signup" className="hover:underline">
                  Create User
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
