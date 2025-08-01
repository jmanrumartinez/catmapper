import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhat, sepolia } from "wagmi/chains";

const chain =
  process.env.NEXT_PUBLIC_USE_HARDHAT === "true" ? hardhat : sepolia;

const config = getDefaultConfig({
  appName: "Catmapper",
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "",
  chains: [chain],
  ssr: true,
});

export { config };
