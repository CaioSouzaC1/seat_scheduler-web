import * as React from "react";
import ReactInputMask, { Props as InputMaskProps } from "react-input-mask";
import { cn } from "@/lib/utils";

interface CustomInputMaskProps extends InputMaskProps {
  className?: string;
}

const InputMask: React.FC<CustomInputMaskProps> = ({ className, ...props }) => {
  return (
    <ReactInputMask
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

InputMask.displayName = "InputMask";

export { InputMask };
