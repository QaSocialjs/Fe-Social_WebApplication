import React from "react";
import { typeProps } from "../utils/typeProps";
import NavgigationBar from "../components/NavgigationBar";
import FooterApp from "../components/footer";

const Mainlayout = ({ children }: typeProps): React.ReactNode => {
  return (
    <div className="w-full h-full flex flex-col">
      <NavgigationBar />
      {children}
      <FooterApp />
    </div>
  );
};

export default Mainlayout;
