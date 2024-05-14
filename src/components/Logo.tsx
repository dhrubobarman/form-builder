import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent cursor-pointer"
    >
      PageForm
    </Link>
  );
};

export default Logo;
