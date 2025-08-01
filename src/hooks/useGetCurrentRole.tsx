import { useAccount } from "wagmi";
import { useStakeHolders } from "./useGetStakeholders";
import { areAddressesEqual } from "@/lib/utils";

export const useGetCurrentRole = (id: string) => {
  const { address } = useAccount();
  const { stakeholders } = useStakeHolders(id);

  const getCurrentUserRole = () => {
    if (!address || !stakeholders) return null;

    const { buyer, inspector, seller, lender } = stakeholders;

    if (buyer && areAddressesEqual(address, buyer)) return "buyer";
    if (inspector && areAddressesEqual(address, inspector)) return "inspector";
    if (seller && areAddressesEqual(address, seller)) return "seller";
    if (lender && areAddressesEqual(address, lender)) return "lender";

    return null;
  };

  return { getCurrentUserRole };
};
