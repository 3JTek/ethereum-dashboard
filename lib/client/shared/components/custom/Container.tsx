import React, { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="px-8 md:px-40 flex flex-1 justify-center py-10">
      <div className="flex flex-col max-w-[960px] flex-1">{children}</div>
    </div>
  );
};

export default Container;
