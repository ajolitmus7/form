"use client";
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";

const profile: NextPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen  bg-blue-400 p-[20px]">
      <div className="w-full flex justify-end">
        <button
          className="  bg-yellow-400 hover:bg-yellow-300 p- rounded text-yellow-900 hover:text-yellow-800 transition duration-300"
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
        >
          Sign out
        </button>
      </div>
      <div className="flex justify-center">
        <h2>your are sign in </h2>
      </div>
    </div>
  );
};

export default profile;
