import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhat, sepolia } from "wagmi/chains";

const chain =
  process.env.NEXT_PUBLIC_USE_HARDHAT === "true" ? hardhat : sepolia;

console.log(
  "process.env.NEXT_PUBLIC_USE_HARDHAT",
  process.env.NEXT_PUBLIC_USE_HARDHAT
);

const config = getDefaultConfig({
  appName: "Catmapper",
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "",
  chains: [chain],
  ssr: true,
});

export { config };
