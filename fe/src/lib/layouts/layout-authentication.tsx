import React from "react";
import { typeProps } from "../utils/typeProps";
import { cn } from "../utils/utils";

const LayoutAuthentication = ({
  children,
  className,
}: typeProps): React.ReactElement => {
  return <div className={cn("", className)}>{children}</div>;
};

export default LayoutAuthentication;
