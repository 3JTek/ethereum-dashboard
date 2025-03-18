import React, { PropsWithChildren } from "react";

const Segment = ({ children }: PropsWithChildren) => {
  return <div className="rounded-xl border border-[#325567] dark:bg-[#111c22] p-5">{children}</div>;
};

export default Segment;
