"use client";

import { ListingCard } from "@/components/listing/ListingCard";
import { NavigationBar } from "@/components/shared/navigation/NavigationBar";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Home() {
  const [account, setAccount] = useState();

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!window.ethereum) {
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);

      console.log("account", account);
    };

    loadBlockchainData();
  }, []);

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className="max-w-7xl mx-auto my-0 py-0 px-5">
        <h3 className="mt-12 mx-0 mb-5 text-2xl font-bold">
          Welcome to Catmapper
        </h3>
        <div className="grid gap-2.5 grid-cols-[repeat(auto-fit,minmax(min(100%,350px),1fr))]">
          <ListingCard />
        </div>
      </div>
    </div>
  );
}
