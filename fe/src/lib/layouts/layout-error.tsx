import { typeProps } from "@lib/utils/typeProps";
import { cn } from "@lib/utils/utils";
import React from "react";

function LayoutError({ children, className }: typeProps): React.ReactElement {
  return <div className={cn("h-full w-full", className)}>{children}</div>;
}

export default LayoutError;
