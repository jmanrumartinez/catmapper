import Image from "next/image";
import { Button } from "@components/ui/button";
import { NavigationLink } from "./NavigationLink";
import { ethers } from "ethers";
import { trimAccountHash } from "@/lib/utils";

type NavigationBar = {
  onConnect: (account: string) => void;
  account?: string;
};

// TODO: don't pass account down, use a context or check if rainbow kit has a way to do this
export const NavigationBar = ({ onConnect, account }: NavigationBar) => {
  const handleConnect = async () => {
    if (!window.ethereum) {
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    onConnect(account);
  };

  return (
    <nav className="w-full">
      <div className="mx-auto max-w-7xl py-8 flex items-center justify-between">
        <ul className="flex items-center list-none">
          <NavigationLink>Buy</NavigationLink>
          <NavigationLink>Sell</NavigationLink>
          <NavigationLink>Rent</NavigationLink>
        </ul>

        <div className="flex justify-center items-center">
          <Image
            src="logo.svg"
            width={125}
            height={62}
            alt="Logo of Catmapper"
          />
          <h1 className="text-[var(--clr-blue)] text-4xl font-bold">
            Catmapper
          </h1>
        </div>

        {/* TODO: Replace this by RainbowKit  */}
        <Button
          onClick={handleConnect}
          className="cursor-pointer bg-[var(--clr-blue)] hover:bg-[var(--clr-blue-2)] transition-all"
        >
          {(account && trimAccountHash(account)) ?? "Connect your wallet"}
        </Button>
      </div>
    </nav>
  );
};
