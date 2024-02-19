import React from "react";
import GoogleDocs from "./_components/svgFiles";
import Link from "next/link";
import { createDecipheriv } from "crypto";
const Home = () => {
  
  return (
    <div className="h-[100%]">
      <div className="flex justify-evenly mt-5">
        <div className="flex gap-2 items-center ">
          <GoogleDocs />
          <h2 className="font-semibold">Scrible Edit</h2>
        </div>

        <div className="flex ml-6 items-center">
          <Link href="/accounts/signin"> Login</Link>
          <Link href="/accounts/signup">
            <h2 className="pl-3 signup-btn ml-3">Signup for free </h2>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center h-full mt-[10%] flex-col">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">
              Build your best ideas together
            </h2>
            <p className="mt-10 text-2xl font-medium border-text">
              Create and collaborate on online documents in real-time
            </p>
          </div>

          <h2 className="block pl-3 signup-btn mt-5">
            <Link href="/accounts/signup" className="block">
              Get Started{" "}
            </Link>{" "}
          </h2>
        </div>

        <div className="sm: mt-3">
          <img src="/docs2.png" alt="docs"
          className="shadow rounded-lg mb-5 "


           
          />
        </div>
      </div>


    </div>
  );
};

export default Home;


