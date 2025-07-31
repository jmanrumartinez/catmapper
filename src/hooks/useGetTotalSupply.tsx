import { getContractAddress } from "@/lib/utils";
import RealEstateAbi from "@consts/abis/RealEstate.json";
import { useReadContract } from "wagmi";

export const useGetTotalSupply = (): {
  totalSupply: number;
  isLoading: boolean;
} => {
  const { data, isLoading } = useReadContract({
    abi: RealEstateAbi,
    address: getContractAddress("realEstate"),
    functionName: "totalSupply",
  });

  return { totalSupply: data as number, isLoading };
};
