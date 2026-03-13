"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
// import { OTPInput, OTPInputContext } from "input-otp" // Commented out to isolate error

// Simplified Mock Component
const InputOTP = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
    ({ className, containerClassName, ...props }, ref) => (
        <div className={cn("flex items-center gap-2", containerClassName)}>
            <input
                ref={ref}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                {...props}
            />
        </div>
    )
)
InputOTP.displayName = "InputOTP"

// Mock Groups/Slots to prevent errors in page.tsx imports
const InputOTPGroup = ({ children, className }: any) => <div className={cn("flex", className)}>{children}</div>
const InputOTPSlot = ({ index, ...props }: any) => <div className="hidden" /> // Hidden because we use a single input above
const InputOTPSeparator = () => null

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
