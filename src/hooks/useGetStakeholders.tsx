import { useReadContracts } from "wagmi";

import EscrowAbi from "@consts/abis/Escrow.json";

const baseEscrowContract = {
  address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" as `0x${string}`,
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
