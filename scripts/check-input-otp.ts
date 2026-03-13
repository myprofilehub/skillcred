import * as InputOtpModule from "input-otp";
import DefaultInputOtp from "input-otp";

console.log("Named exports:", Object.keys(InputOtpModule));
console.log("Default export type:", typeof DefaultInputOtp);
console.log("Is OTPInput in named:", "OTPInput" in InputOtpModule);
console.log("Default export:", DefaultInputOtp);
