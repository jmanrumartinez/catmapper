import RealEstateAbi from "@consts/abis/RealEstate.json";
import { useReadContract } from "wagmi";

export const useGetTotalSupply = (): {
  totalSupply: number;
  isLoading: boolean;
} => {
  const { data, isLoading } = useReadContract({
    abi: RealEstateAbi,
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    functionName: "totalSupply",
  });

  return { totalSupply: data as number, isLoading };
};
