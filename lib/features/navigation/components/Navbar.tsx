"use client";

import Logo from "./Logo";
import NavItem from "./NavItem";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#233c48] px-4 md:px-10 py-3">
      <Logo />
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <NavItem name="dashboard" href={"/"} />
        </div>
        <div className="flex items-center gap-9">
          <NavItem name="swap" href={"/swap"} />
        </div>
        <div>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
