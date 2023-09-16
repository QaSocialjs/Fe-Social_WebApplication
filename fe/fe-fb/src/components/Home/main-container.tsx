import { ReactNode } from "react";
import classes from "./MaiContainer.module.css";

type MainContainerProps = {
  children: ReactNode;
  className?: string;
};
function MainContainer({
  children,
  className,
}: MainContainerProps): React.ReactElement {
  return <main className={classes.MainContainerBox}>{children}</main>;
}

export default MainContainer;
