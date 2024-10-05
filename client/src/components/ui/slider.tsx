import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-4/5 mx-auto mt-10 touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/50">
      <SliderPrimitive.Range className="absolute h-full bg-sub8" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="relative flex items-center justify-center h-4 w-4 rounded-full border border-sub8/50 bg-sub8 shadow transition-colors disabled:pointer-events-none disabled:opacity-50">
      <div className="absolute h-5 w-5 rounded-full bg-sub8/70 transition-colors disabled:pointer-events-none disabled:opacity-50 blur-sm" />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
