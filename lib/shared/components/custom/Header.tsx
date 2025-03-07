import React from "react";

type Props = {
  type: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
};

const Header = ({ type, children }: Props) => {
  if (type === "h1") {
    return <h1 className="text-4xl font-bold leading-tight">{children}</h1>;
  }

  if (type === "h2") {
    return <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">{children}</h2>;
  }

  if (type === "h3") {
    return <h3 className="text-xl font-bold leading-tight">{children}</h3>;
  }

  if (type === "h4") {
    return <h4 className="text-base font-bold leading-tight">{children}</h4>;
  }
};

export default Header;
