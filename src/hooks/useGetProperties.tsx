import { PropertyType } from "@/types/listing";
import RealEstateAbi from "@consts/abis/RealEstate.json";
import { useCallback, useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { useGetTotalSupply } from "@/hooks/useGetTotalSupply";
import { config } from "@/config/wagmi";

export const useGetProperties = () => {
  const totalSupply = useGetTotalSupply();
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const fetchProperties = useCallback(async () => {
    if (!totalSupply) return;
    const propertiesToLoad = [];

    for (let i = 1; i <= totalSupply; i++) {
      const uri = await readContract(config, {
        abi: RealEstateAbi,
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        functionName: "tokenURI",
        args: [i],
      });

      const response = await fetch(uri as string);
      const data = await response.json();

      propertiesToLoad.push(data);
    }

    setProperties(propertiesToLoad);
  }, [totalSupply]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties };
};
