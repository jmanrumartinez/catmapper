import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NavigationBar = () => {
  return (
    <nav className="w-full">
      <div className="mx-auto max-w-7xl py-8 flex items-center justify-between">
        <div className="flex justify-center items-center">
          <h1 className="text-purple-600 text-4xl font-bold">Catmapper</h1>
        </div>

        <ConnectButton />
      </div>
    </nav>
  );
};
