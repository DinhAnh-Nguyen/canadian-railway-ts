"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/_utils/auth-context";
import {
  BsArrowLeftShort,
  BsChevronDown,
  BsFillImageFill,
  BsSearch,
} from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";

export default function Nav() {
  const router = useRouter();
  const { user, googleSignOut } = useUserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const Menus = [
    { title: "Dashboard" },
    { title: "Track Overview" },
    { title: "Schedule" },
    {
      title: "Weather",
      spacing: true,
      icon: <BsFillImageFill></BsFillImageFill>,
    },
    {
      title: "Projects",
      subMenu: true,
      subMenuItems: [
        { title: "Project 1" },
        { title: "Project 2" },
        { title: "Project 3" },
      ],
    },
    { title: "Manage Users" },
    { title: "Admin" },
    { title: "Help", spacing: true },
    { title: "Settings" },
    { title: "Logout" },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-dark-purple h-screen p-5 pt-8 ${isMenuOpen ? "w-72" : "w-20"} duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!isMenuOpen && "rotate-180"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></BsArrowLeftShort>
        <div className="inline-flex">
          <AiFillEnvironment className="bg-amber-300 text-4xl text-black rounded cursor-pointer block float-left mr-2"></AiFillEnvironment>
          <h1
            className={`text-white origin-left font-medium text-2xl ${!isMenuOpen && "scale-0"} `}
          >
            RAILLY
          </h1>
        </div>
        <div
          className={`flex items-center rounded-md bg-light-white mt-6 ${!isMenuOpen ? "px-2.5" : "px-4"} py-2`}
        >
          <BsSearch
            className={`text-black text-lg block float-left cursor-pointer ${isMenuOpen && "mr-2"}`}
          ></BsSearch>
          <input
            type={"search"}
            placeholder="Search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${!isMenuOpen && "hidden"}`}
          ></input>
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => {
            return (
              <>
                <li
                  key={index}
                  className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}
                >
                  <span className="text-2xl block float-left">
                    {menu.icon ? (
                      menu.icon
                    ) : (
                      <RiDashboardFill></RiDashboardFill>
                    )}
                  </span>
                  <span
                    className={`text-base font-medium flex-1 duration-300 ${!isMenuOpen && "hidden"}`}
                  >
                    {menu.title}
                  </span>
                  {menu.subMenu && isMenuOpen && (
                    <BsChevronDown
                      className={`${isSubMenuOpen && "rotate-180"}`}
                      onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                    ></BsChevronDown>
                  )}
                </li>
                {menu.subMenu && isSubMenuOpen && isMenuOpen && (
                  <ul>
                    {menu.subMenuItems.map((subMenuItem, index) => {
                      return (
                        <li
                          key={index}
                          className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}
                        >
                          {subMenuItem.title}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            );
          })}
        </ul>
      </div>
      <div className="p-7">
        <h1 className="text-2xl font-semibold">Home Page</h1>
      </div>
      {/*
      <div className="">
        <Link href="/dashboard" className="text-2xl font-bold">
          Railway App
        </Link>
      </div>


      <div className="flex flex-col">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/trackOverview">
          <button className="hover:underline">Track Overview</button>
        </Link>
        <button
          type="button"
          onClick={() => router.push("/schedule")}
          className="hover:underline"
        >
          Schedule
        </button>
        <Link href="/weather" className="hover:underline">
          Weather
        </Link>
        <Link href="/manageusers">
      <div className="w-full md:w-[30%] flex items-center justify-end gap-4 text-sm">
        <div>
          <span className="font-medium p-3">
            {user?.displayName || "Anonymous"}
          </span>
          <button
            onClick={() => {
              googleSignOut();
              router.push("/signIn");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div> */}
    </div>
  );
}
