import { useReadContracts } from "wagmi";
import { getContractAddress } from "@/lib/utils";

import EscrowAbi from "@consts/abis/Escrow.json";

const escrowAddress = getContractAddress("escrow") as `0x${string}`;

const baseEscrowContract = {
  address: escrowAddress,
  abi: EscrowAbi,
};

type Stakeholders = {
  buyer?: `0x${string}`;
  seller?: `0x${string}`;
  lender?: `0x${string}`;
  inspector?: `0x${string}`;
};

type UseStakeHoldersResult = {
  stakeholders: Stakeholders;
  isLoading: boolean;
};

export const useStakeHolders = (propertyId: string): UseStakeHoldersResult => {
  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        ...baseEscrowContract,
        functionName: "getBuyer",
        args: [propertyId],
      },
      {
        ...baseEscrowContract,
        functionName: "seller",
      },
      {
        ...baseEscrowContract,
        functionName: "lender",
      },
      {
        ...baseEscrowContract,
        functionName: "inspector",
      },
    ],
  });
  const [buyerResult, sellerResult, lenderResult, inspectorResult] = data ?? [];

  return {
    stakeholders: {
      buyer: buyerResult?.result as `0x${string}` | undefined,
      seller: sellerResult?.result as `0x${string}` | undefined,
      lender: lenderResult?.result as `0x${string}` | undefined,
      inspector: inspectorResult?.result as `0x${string}` | undefined,
    },
    isLoading,
  };
};
