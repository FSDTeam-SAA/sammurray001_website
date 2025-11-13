
import Footer from "@/components/web/footer";
import Header from "@/components/web/header";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="bg-[#070E28]">{children}</div>
       <div className="mx-2">
       <Footer />
       </div>
    </div>
  );
}

export default layout;
