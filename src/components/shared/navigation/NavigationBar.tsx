import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NavigationBar = () => {
  return (
    <nav className="w-full">
      <div className="mx-auto max-w-7xl py-8 flex items-center justify-between">
        <div className="flex justify-center items-center">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>

        <ConnectButton />
      </div>
    </nav>
  );
};
