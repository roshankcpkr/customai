import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-10">
      {children}
    </div>
  );
}

export default AuthLayout;
