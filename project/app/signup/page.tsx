"use client";
import React, { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SIGNUP_USER } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
interface user {
  name: string;
  email: string;
  password: string;
}
const Signup = () => {
  const router = useRouter();
  const [inputfield, setInputfield] = useState<user>({
    name: "",
    email: "",
    password: "",
  });
  const [createUser] = useMutation(SIGNUP_USER, {
    onCompleted() {
      router.push("/");
      setInputfield({ name: "", email: "", password: "" });
    },
    onError(err) {
      console.log(err);
    },
  });

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputfield({ ...inputfield, [e.target.name]: e.target.value });
  };
  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      inputfield.email === "" ||
      inputfield.password === "" ||
      inputfield.password === ""
    )
      return alert("Enter empty fields");
    await createUser({
      variables: inputfield,
    });
  };
  // {
  //   loading ? <div>loading</div> : error ? <div>error found</div> : "";
  // }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-400">
        <div className="bg-white p-16 rounded shadow-2xl lg:w-2/4 md:w-3/4">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            Create Your Account
          </h2>
          <form className="space-y-5" onSubmit={handleSumbit}>
            <div>
              <label className="block mb-1 font-bold text-gray-500">Name</label>
              <input
                type="text"
                name="name"
                value={inputfield.name}
                onChange={inputHandle}
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-gray-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={inputfield.email}
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
                value={inputfield.password}
                onChange={inputHandle}
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
