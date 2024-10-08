import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "lib/utils";

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-3/5 mx-auto touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/50">
      <SliderPrimitive.Range className="absolute h-full bg-[#E8B900]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="relative flex items-center justify-center h-3 w-3 rounded-full border border-[#E8B900]/50 bg-[#E8B900] shadow transition-colors disabled:pointer-events-none disabled:opacity-50">
      <div className="absolute h-6 w-6 rounded-full bg-[#E8B900]" />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
RangeSlider.displayName = SliderPrimitive.Root.displayName;

export { RangeSlider };
