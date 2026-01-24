import PublicFooter from "@/shared/components/PublicFooter";
import PublicHeader from "@/shared/components/PublicHeader";
import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <main>
         <Outlet />
      </main>
     
     <PublicFooter />
    </>
  );
};

export default PublicLayout;
