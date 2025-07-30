import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const trimAccountHash = (accountHash: string): string => {
  return accountHash.slice(0, 7) + "..." + accountHash.slice(37, 42);
};

export const areAddressesEqual = (
  address1: string,
  address2: string
): boolean => {
  return address1.toLocaleLowerCase() === address2.toLocaleLowerCase();
};
