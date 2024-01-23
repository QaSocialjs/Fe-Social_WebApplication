import { cn } from "@lib/utils/utils";
import clsx from "clsx";
import { ImgHTMLAttributes } from "react";
import { AvatarFullConfig } from "react-nice-avatar";
import AvatarNice from "./Avatarnice";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackConfig?: string | AvatarFullConfig;
}
const baseClass =
  "aspect-square max-w-full h-auto object-cover object-center rounded-full hover:bg-primary-50 border-none rac-hover:bg-primary-50 hover:outline-none";
function AvatarClient({ src, fallbackConfig, className, ...props }: Props) {
  if (src) {
    return <img src={src} className={cn(baseClass, className)} {...props} />;
  }
  const fallback = (
    <div className={clsx(baseClass, "bg-primary-50", className)} />
  );
  if (fallbackConfig) {
    return (
      <AvatarNice
        config={fallbackConfig!}
        className={cn(baseClass, className)}
      />
    );
  }

  return fallback;
}

export default AvatarClient;
