import { PropertyType } from "@/types/listing";
import RealEstateAbi from "@consts/abis/RealEstate.json";
import { useCallback, useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { useGetTotalSupply } from "@/hooks/useGetTotalSupply";
import { config } from "@/config/wagmi";
import { getContractAddress } from "@/lib/utils";

export const useGetProperties = () => {
  const { totalSupply } = useGetTotalSupply();
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const [properties, setProperties] = useState<PropertyType[]>([]);

  console.log("properties", properties);

  const fetchProperties = useCallback(async () => {
    if (!totalSupply) return;
    const propertiesToLoad = [];
    setIsLoading(true);

    for (let i = 1; i <= totalSupply; i++) {
      const uri = await readContract(config, {
        abi: RealEstateAbi,
        address: getContractAddress("realEstate"),
        functionName: "tokenURI",
        args: [i],
      });

      const response = await fetch(uri as string);
      const data = await response.json();

      propertiesToLoad.push(data);
    }

    setProperties(propertiesToLoad);
    setIsLoading(false);
  }, [totalSupply]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, isLoading };
};
