import { useReadContracts } from "wagmi";
import { useStakeHolders } from "./useGetStakeholders";
import { getContractAddress } from "@/lib/utils";
import EscrowAbi from "@consts/abis/Escrow.json";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

const escrowAddress = getContractAddress("escrow") as `0x${string}`;

const baseEscrowContract = {
  address: escrowAddress,
  abi: EscrowAbi,
};

type PropertyState = {
  hasBeenBought: boolean;
  hasBeenLent: boolean;
  hasBeenInspected: boolean;
  hasBeenSold: boolean;
};

type UseGetPropertyStateResult = {
  propertyState: PropertyState;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
  isLoading: boolean;
};

export const useGetPropertyState = (
  propertyId: string
): UseGetPropertyStateResult => {
  const { stakeholders } = useStakeHolders(propertyId);
  const { buyer, seller, lender } = stakeholders;

  const { data, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        ...baseEscrowContract,
        functionName: "hasApproved",
        args: [propertyId, buyer],
      },
      {
        ...baseEscrowContract,
        functionName: "hasApproved",
        args: [propertyId, lender],
      },
      {
        ...baseEscrowContract,
        functionName: "hasPassedInspection",
        args: [propertyId],
      },
      {
        ...baseEscrowContract,
        functionName: "hasApproved",
        args: [propertyId, seller],
      },
    ],
    query: {
      enabled: Boolean(
        stakeholders.buyer &&
          stakeholders.seller &&
          stakeholders.lender &&
          stakeholders.inspector
      ),
    },
  });
  const [
    hasBuyerApprovedResult,
    hasLenderApprovedResult,
    hasPassedInspectionResult,
    hasSellerApproved,
  ] = data ?? [];

  return {
    refetch,
    propertyState: {
      hasBeenBought: (hasBuyerApprovedResult?.result as boolean) ?? false,
      hasBeenLent: (hasLenderApprovedResult?.result as boolean) ?? false,
      hasBeenInspected: (hasPassedInspectionResult?.result as boolean) ?? false,
      hasBeenSold: (hasSellerApproved?.result as boolean) ?? false,
    },
    isLoading,
  };
};
