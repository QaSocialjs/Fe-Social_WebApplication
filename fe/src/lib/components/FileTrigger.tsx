import {
  FileTrigger as AriaFileTrigger,
  FileTriggerProps,
} from "react-aria-components";

type Props = FileTriggerProps & React.RefAttributes<HTMLInputElement>;
function FileTrigger({ children, ...props }: Props) {
  return <AriaFileTrigger {...props}>{children}</AriaFileTrigger>;
}

export default FileTrigger;
