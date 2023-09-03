import React from "react";

export type LayoutProps = {
  children: React.ReactNode;
};

export const HomeLayout = ({ children }: LayoutProps): React.ReactElement => {
  return (
    <>
      <div
        style={{
          display: "flex",
          color: "white",
        }}
      >
        {children}
        <div>adsadawd</div>
      </div>
    </>
  );
};
