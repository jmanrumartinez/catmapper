"use client";

import { ListingCard } from "@/components/listing/ListingCard";
import { NavigationBar } from "@/components/shared/navigation/NavigationBar";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import config from "@/consts/config.json";
import RealEstateAbi from "@consts/abis/RealEstate.json";
import EscrowAbi from "@consts/abis/Escrow.json";
import { ListingDialog } from "@/components/listing/ListingDialog";
import { PropertyType } from "@/types/listing";

export default function Home() {
  const [account, setAccount] = useState<string | undefined>();
  const [provider, setProvider] = useState<ethers.BrowserProvider>();

  // Page data
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [escrow, setEscrow] = useState<ethers.Contract>();
  const [properties, setProperties] = useState<PropertyType[]>([]);

  // Dialog
  const [isPropertyDialogVisible, setIsPropertyDialogVisible] = useState(false);
  const [propertySelected, setPropertySelected] = useState<PropertyType>();

  const handleConnectAccount = (account: string) => {
    setAccount(account);
  };

  useEffect(() => {
    const initializeConnection = async () => {
      if (!window.ethereum) {
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();

      const realEstate = new ethers.Contract(
        config[network.chainId].realEstate.address,
        RealEstateAbi,
        provider
      );
      const totalSupply = await realEstate.totalSupply();
      setTotalSupply(totalSupply);

      const propertiesToLoad = [];
      for (let i = 1; i <= totalSupply; i++) {
        const uri = await realEstate.tokenURI(i);
        const response = await fetch(uri);
        const data = await response.json();
        propertiesToLoad.push(data);
      }

      setProperties(propertiesToLoad);
      console.log("propertiesToLoad", propertiesToLoad);

      const escrow = new ethers.Contract(
        config[network.chainId].escrow.address,
        EscrowAbi,
        provider
      );
      setEscrow(escrow);
    };

    window.ethereum.on("accountsChanged", async () => {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      handleConnectAccount(account);
    });
    initializeConnection();
  }, []);

  const handleClickViewMore = (id: string) => {
    setIsPropertyDialogVisible(true);
    setPropertySelected(() => {
      return properties.find((property) => property.id === id);
    });
  };

  return (
    <div>
      <NavigationBar onConnect={handleConnectAccount} account={account} />
      <div className="max-w-7xl mx-auto my-0 py-0 px-5">
        <h3 className="mt-12 mx-0 mb-5 text-2xl font-bold">
          {totalSupply} available properties for you
        </h3>
        <div className="grid gap-2.5 grid-cols-[repeat(auto-fit,minmax(min(100%,350px),1fr))]">
          {properties.map((property) => (
            <ListingCard
              key={property.id}
              property={property}
              onClickViewMore={handleClickViewMore}
            />
          ))}
        </div>
      </div>
      {propertySelected && escrow && account ? (
        <ListingDialog
          account={account}
          escrow={escrow}
          property={propertySelected}
          isOpen={isPropertyDialogVisible}
          onOpenChange={(isOpen) => {
            setPropertySelected(undefined);
            setIsPropertyDialogVisible(isOpen);
          }}
        />
      ) : null}
    </div>
  );
}
