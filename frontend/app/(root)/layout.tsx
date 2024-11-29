import { Navbar } from "@/components/shared/Navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full ">{children}</main>
    </div>
  );
};

export default RootLayout;
