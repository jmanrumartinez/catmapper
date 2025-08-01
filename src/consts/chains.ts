import config from "@/consts/config.json";

export const chainId: Record<string, keyof typeof config> = {
  HARDHAT: "31337",
  SEPOLIA: "11155111",
};
