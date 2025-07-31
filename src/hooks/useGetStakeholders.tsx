import { useReadContracts } from "wagmi";

import EscrowAbi from "@consts/abis/Escrow.json";

const baseEscrowContract = {
  address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" as `0x${string}`,
  abi: EscrowAbi,
};

export const useStakeHolders = (propertyId: string) => {
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
      buyer: buyerResult?.result,
      seller: sellerResult?.result,
      lender: lenderResult?.result,
      inspector: inspectorResult?.result,
    },
    isLoading,
  };
};
