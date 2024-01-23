import Link from "@components/Link";
import { cn } from "@lib/utils/utils";
import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router";
import clsx from "clsx";
type Props = React.HTMLAttributes<HTMLDivElement> & {
  items: { label: string; href: string }[];
  className?: string;
};

function Slibar({ items, className, ...props }: Props) {
  const { pathname } = useLocation();
  return (
    <div {...props} className={cn("flex flex-col gap-2", className)}>
      {items?.map(({ label, href }, index) => (
        <Link
          key={index}
          className={clsx(
            "text-primary-950 text-opacity-70 py-1 text-base no-underline w-full relative",
            {
              "text-accent-500": pathname === href,
            }
          )}
          href={href}
        >
          <span className="px-2">{label}</span>
          {pathname === href ? (
            <motion.div
              layoutId="underline"
              className="w-full absolute h-full bg-accent-100 bg-opacity-5  top-0 rounded"
            />
          ) : null}
        </Link>
      ))}
    </div>
  );
}

export default Slibar;
