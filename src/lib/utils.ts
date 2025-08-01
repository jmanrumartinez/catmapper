import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import config from "@/consts/config.json";
import { chainId } from "@/consts/chains";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function areAddressesEqual(address1: string, address2: string): boolean {
  return address1.toLowerCase() === address2.toLowerCase();
}

export function getContractAddress(
  contractName: "realEstate" | "escrow"
): `0x${string}` {
  const chain =
    process.env.NEXT_PUBLIC_USE_HARDHAT === "true"
      ? chainId.HARDHAT
      : chainId.SEPOLIA;
  return config[chain as keyof typeof config][contractName]
    .address as `0x${string}`;
}
