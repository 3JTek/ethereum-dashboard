import Link from "next/link";
import React from "react";

const NavItem = ({ name, href }: { name: string; href: string }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link href={href}>
        <p className="capitalize">{name}</p>
      </Link>
    </div>
  );
};

export default NavItem;
