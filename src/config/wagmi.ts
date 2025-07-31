import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhat } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Catmapper",
  projectId: process.env.REOWN_PROJECT_ID ?? "",
  chains: [hardhat],
  ssr: true,
});

export { config };
