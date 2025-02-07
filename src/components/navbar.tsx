"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/_utils/auth-context";

import { FcEnteringHeavenAlive } from "react-icons/fc";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiDashboardFill, RiLogoutCircleRLine } from "react-icons/ri";
import { LuTrainTrack } from "react-icons/lu";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineManageAccounts, MdOutlineFeedback } from "react-icons/md";
import { usePathname } from "next/navigation"

export default function Nav() {
  const pathName = usePathname();
  const router = useRouter();
  const { user, googleSignOut } = useUserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const Menus = [
    {
      title: "Dashboard",
      id: 1,
      icon: <RiDashboardFill />,
      path: "/dashboard",
    },
    {
      title: "Track Overview",
      id: 2,
      icon: <LuTrainTrack />,
      path: "/trackOverview",
    },
    {
      title: "Weather",
      id: 3,
      icon: <TiWeatherPartlySunny />,
      path: "/weather",
    },
    {
      title: "Schedule",
      id: 4,
      icon: <AiOutlineSchedule />,
      path: "/schedule",
    },
    { title: "Admin", id: 5, icon: <GrUserAdmin />, path: "/admin" },
    { title: "Help", id: 6, icon: <IoIosHelpCircleOutline />, path: "/help" },
    {
      title: "Manage User",
      id: 7,
      icon: <MdOutlineManageAccounts />,
      path: "/manageusers",
    },
    {
      title: "Feedback",
      id: 8,
      icon: <MdOutlineFeedback />,
      path: "/feedback",
    },
    // { title: "Sign Out", id: 9, spacing: true, icon: <RiLogoutCircleRLine />, path: "/signOut" },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-[#393A3E] h-screen p-5 pt-8 ${isMenuOpen ? "w-52" : "w-20"} duration-300 rounded-md sticky top-0`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!isMenuOpen && "rotate-180"} active:outline-2`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></BsArrowLeftShort>
        <div className="inline-flex">
          <FcEnteringHeavenAlive className="text-4xl text-black rounded cursor-pointer block float-left mr-2"></FcEnteringHeavenAlive>
          <h1
            className={`text-white origin-left font-medium text-2xl ${!isMenuOpen && "scale-0"} cursor-pointer`}
            onClick={() => router.push("/dashboard")}
          >
            RAILLY
          </h1>
        </div>
        <ul className="pt-2">
          {Menus.map((menu) => {
            const isActive = pathName === menu.path;
            return (
              <li
                key={menu.id}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-500 rounded-md mt-2 ${isActive && "bg-slate-500"}`}
                onClick={() => router.push(menu.path)}
              >
                <span className="text-2xl block float-left">{menu.icon}</span>
                <span
                  className={`text-base font-medium flex-1 duration-300 ${!isMenuOpen && "hidden"}`}
                >
                  {menu.title}
                </span>
              </li>
            );
          })}
          <div
            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-500 rounded-md mt-9`}
            onClick={() => {
              googleSignOut();
              router.push("/signIn");
            }}
          >
            <span className="text-2xl block float-left">
              <RiLogoutCircleRLine />
            </span>
            <span
              className={`text-base font-medium flex-1 duration-300 ${!isMenuOpen && "hidden"}`}
            >
              Sign Out
            </span>
          </div>
        </ul>
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
