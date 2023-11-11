import React from "react";
import { typeProps } from "../utils/typeProps";
import { cn } from "../utils/utils";

const baseClass = "w-fit h-fit";
export default function Form({
  children,
  className,
}: typeProps): React.ReactElement {
  return <form className={cn(baseClass, className)}>{children}</form>;
}
