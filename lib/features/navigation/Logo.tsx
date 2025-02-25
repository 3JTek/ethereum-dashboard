import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="flex gap-4" href="/">
      <Image src="/icons/ethereum.svg" alt="Ethereum" width={20} height={20} />
      <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden md:block">Ethereum</h2>
    </Link>
  );
};

export default Logo;
