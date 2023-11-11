import React from "react";
import Logo from "./Logo";
import { data } from "../utils/datasiderbar";
import Link from "./Link";
import HeroIcon from "./Heroicon";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

export default function NavgigationBar(): React.ReactNode {
  const location = useLocation();
  return (
    <nav className="flex h-fit px-6  border-b-2  gap-4 items-center">
      <Logo></Logo>
      <div className="flex gap-4 py-5 relative">
        {data.map(({ ...item }, idx) => (
          <Link
            as="navlink"
            to={item.link}
            key={idx}
            className="relative text-white-600"
          >
            <div className="flex gap-1">
              {location.pathname === item.link && (
                <motion.div
                  layoutId="underline"
                  className="bg-black h-full w-full absolute"
                ></motion.div>
              )}
              <div>{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
