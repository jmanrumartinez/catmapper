import { useReadContracts } from "wagmi";
import { useStakeHolders } from "./useGetStakeholders";
import EscrowAbi from "@consts/abis/Escrow.json";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

const baseEscrowContract = {
  address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" as `0x${string}`,
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
      enabled:
        stakeholders.buyer &&
        stakeholders.seller &&
        stakeholders.lender &&
        stakeholders.inspector,
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
