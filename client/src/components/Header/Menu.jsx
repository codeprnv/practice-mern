import React from "react";
import { Link } from "react-router-dom";
import { NavigationMenu } from "../Navigation/NavigationMenu";

const Menu = () => {
  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden items-center justify-start gap-4 px-4 md:flex md:flex-grow">
        {["Home", "TV Shows", "Categories"].map((item) => (
          <Link
            key={item}
            to="/"
            title={item}
            className="cursor-pointer rounded-md text-[11px] font-semibold text-white transition-colors duration-200 hover:text-gray-400 md:text-sm"
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu */}
      <nav className="w-full items-center justify-start px-1 py-2 md:hidden ">
        <NavigationMenu />
      </nav>
    </>
  );
};

export default Menu;
