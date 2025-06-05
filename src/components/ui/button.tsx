import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(
                    "w-full py-4 px-4 my-2 bg-gradient-to-r from-blue-600 to-sky-500 font-bold rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:from-sky-500 hover:to-blue-600 hover-animated-gradient-button",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"

export { Button }
