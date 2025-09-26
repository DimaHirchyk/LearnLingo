import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-14 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base outline-none focus:border-gray-500",
        className
      )}
      {...props}
    />
  );
}

export { Input };
