"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx";
import { BackgroundGradient } from "../ui/background-gradient";
import SidebarButton from "@/components/global/sidebar";

const Navbar = () => {
  //   const [toggle, setToggle] = React.useState(false);
  const menuItems = [
    {
      title: "Home",
      url: "/",
      description: "Home Page",
    },
    // {
    //   title: "About Us",
    //   url: "/about-us",
    //   description: "Know more about us",
    // },
    {
      title: "Events",
      url: "/events",
      description: "Check out our events",
    },
    {
      title: "Our Team",
      url: "/our-team",
      description: "Meet our team",
    },
    {
      title: "Blogs",
      url: "/blogs",
      description: "Read our blogs",
    },
    // {
    //   title: "Register",
    //   url: "/register",
    //   description: "Register with us",
    // },
  ];
  const pathName = usePathname();
  return (
    <header className="z-20 h-[20%] lg:px-16 px-6 md:px-10 flex flex-row items-center justify-between border-white cursor-pointer">
      <Link href="/">
        <Image
          src="/nav-logo.svg"
          width={300}
          height={150}
          alt="Alexa Developers SRM Logo"
          className="object-contain w-52 md:w-52 lg:w-60 h-auto xl:w-80"
          priority
        />
      </Link>

      <aside className="flex flex-row items-center justify-center my-4">
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4 2xl:gap-20 lg:gap-14 md:gap-5 list-none text-white">
            {menuItems.map((item, index) => {
              return pathName === item.url ? (
                <BackgroundGradient
                  key={index}
                  className="px-2 bg-transparent cursor-pointer"
                  animate={false}
                >
                  <li className={clsx("bg-transparent")}> 
                    <Link href={item.url} className="cursor-pointer">
                      {item.title}
                    </Link>
                  </li>
                </BackgroundGradient>
              ) : (
                <li
                  key={index}
                  className={clsx("bg-transparent hover:font-bold cursor-pointer")}
                >
                  <Link href={item.url} className="block cursor-pointer">
                    <button className="px-6 py-2 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 cursor-pointer">
                      {item.title}
                    </button>
                  </Link>
                </li>
              );
            })}
            <Link href={"/recruitments26"} className="block cursor-pointer">
              <li
                className={clsx(
                  "px-6 py-2 shadow-2xl drop-shadow-2xl text-white rounded-lg font-extrabold transform hover:-translate-y-1 transition duration-400 cursor-pointer"
                )}
              >
                <button className="px-8 py-2 rounded-full bg-gradient-to-b from-[#00B5FF] to-[#00CDC1] text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 cursor-pointer">
                  Recruitments 26
                </button>
                {/* <span className="text-[#980F35]">Alexa</span>
                <span className="text-[#AF6922]">Verse</span> */}
              </li>
            </Link>
          </ul>
        </nav>
        <SidebarButton menuItems={menuItems} />
        {/* <SideMenu /> */}
      </aside>
    </header>
  );
};

export default Navbar;
