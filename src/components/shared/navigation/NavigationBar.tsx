import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NavigationBar = () => {
  return (
    <nav className="w-full" aria-label="Main navigation">
      <div className="mx-auto max-w-7xl py-8 flex items-center justify-between">
        <div className="flex justify-center items-center">
          <Link href="/" aria-label="CatMapper Home">
            <Image
              src="/logo.png"
              alt="CatMapper Logo"
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>

        <div role="complementary" aria-label="Wallet connection">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};
