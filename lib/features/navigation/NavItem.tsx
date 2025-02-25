import React from "react";

const NavItem = ({ name, isLive }: { name: string; isLive: boolean }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="capitalize">{name}</p>
      {!isLive && <span className=" text-xs text-destructive">{`(coming soon)`}</span>}
    </div>
  );
};

export default NavItem;
