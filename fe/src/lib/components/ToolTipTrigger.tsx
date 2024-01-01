import { typeProps } from "@lib/utils/typeProps";
import { TooltipTrigger as TriggerTooltip } from "react-aria-components";

export default function TooltipTrigger({ children }: typeProps) {
  return <TriggerTooltip>{children}</TriggerTooltip>;
}
