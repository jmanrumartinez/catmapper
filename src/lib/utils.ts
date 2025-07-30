import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const trimAccountHash = (accountHash: string) => {
  return accountHash.slice(0, 7) + "..." + accountHash.slice(37, 42);
};
