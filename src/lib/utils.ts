import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import config from "@/consts/config.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function areAddressesEqual(address1: string, address2: string): boolean {
  return address1.toLowerCase() === address2.toLowerCase();
}

export function getContractAddress(
  contractName: "realEstate" | "escrow"
): `0x${string}` {
  const chainId = "31337"; // hardhat localhost
  return config[chainId as keyof typeof config][contractName]
    .address as `0x${string}`;
}
