import React, { Suspense } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function Landing() {
  return (
    <div className="mt-[8rem] flex w-11/12 items-center justify-center md:w-6/12">
      <div className="flex flex-col items-start text-start lg:mr-[5rem]">
        <h1 className="text-7xl font-bold tracking-tight text-slate-700 md:text-8xl">
          Write <br /> Run <br /> Python <br />
          <span className="bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
            Anywhere
          </span>
        </h1>
        <p className="mt-8 text-start text-2xl font-normal text-gray-500 dark:text-gray-400 lg:text-xl">
          Run your Python code anywhere you go, from testing small scripts to
          building the AGI.
        </p>

        <p className="text-md lg:text-md mt-8 text-start font-normal text-gray-400 dark:text-gray-200">
          {" "}
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          No please don't do it. This is running on a tiny AWS EC2 instance, be
          gentle hahaha.
        </p>
      </div>
      <div className="hidden justify-self-start lg:block">
        <Suspense fallback={<div>Loading...</div>}>
          <Spline scene="https://prod.spline.design/wkQYeU1ope2EqRGZ/scene.splinecode" />
        </Suspense>
      </div>
    </div>
  );
}
