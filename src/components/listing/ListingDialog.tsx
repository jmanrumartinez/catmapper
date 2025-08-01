import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { iconByType } from "@/consts/listing";
import { getContractAddress } from "@/lib/utils";
import { PropertyType } from "@/types/listing";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useReadContract, useSendTransaction, useWriteContract } from "wagmi";

import { config } from "@/config/wagmi";
import { useGetCurrentRole } from "@/hooks/useGetCurrentRole";
import { useGetPropertyState } from "@/hooks/useGetPropertyState";
import EscrowAbi from "@consts/abis/Escrow.json";
import { readContract } from "@wagmi/core";
import { useMemo } from "react";

const baseEscrowContract = {
  address: getContractAddress("escrow") as `0x${string}`,
  abi: EscrowAbi,
};

type ListingDialogTypes = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  property: PropertyType;
};

export const ListingDialog = ({
  isOpen,
  onOpenChange,
  property,
}: ListingDialogTypes) => {
  const { attributes, id } = property;
  const { propertyState, refetch: refetchPropertyState } =
    useGetPropertyState(id);
  const { getCurrentUserRole } = useGetCurrentRole(id);

  const userRole = useMemo(() => getCurrentUserRole(), [getCurrentUserRole]);

  const { data: isListed } = useReadContract({
    ...baseEscrowContract,
    functionName: "isListed",
    args: [id],
  });

  const { writeContract } = useWriteContract();
  const { sendTransaction } = useSendTransaction();

  const [price, type, ...restAttributes] = attributes;

  const handleBuy = async () => {
    const escrowAmount = await readContract(config, {
      address: getContractAddress("escrow") as `0x${string}`,
      abi: EscrowAbi,
      functionName: "getEscrowAmount",
      args: [id],
    });

    writeContract({
      ...baseEscrowContract,
      functionName: "depositEscrow",
      args: [id],
      value: escrowAmount as bigint,
    });

    writeContract({
      ...baseEscrowContract,
      functionName: "approveSale",
      args: [id],
    });

    refetchPropertyState();
  };

  const handleInspect = async () => {
    writeContract({
      ...baseEscrowContract,
      functionName: "setInspectionStatus",
      args: [id, true],
    });

    refetchPropertyState();
  };

  const handleLend = async () => {
    writeContract({
      ...baseEscrowContract,
      functionName: "approveSale",
      args: [id],
    });

    const escrowAmount = await readContract(config, {
      ...baseEscrowContract,
      functionName: "getEscrowAmount",
      args: [id],
    });
    const purchasePrice = await readContract(config, {
      ...baseEscrowContract,
      functionName: "getPurchasePrice",
      args: [id],
    });

    const lendAmount = (purchasePrice as bigint) - (escrowAmount as bigint);

    sendTransaction({
      to: getContractAddress("escrow") as `0x${string}`,
      value: lendAmount,
    });

    refetchPropertyState();
  };

  const handleSell = async () => {
    writeContract({
      ...baseEscrowContract,
      functionName: "approveSale",
      args: [id],
    });

    writeContract({
      ...baseEscrowContract,
      functionName: "finalizeSale",
      args: [id],
    });

    refetchPropertyState();
  };

  const getPrimaryActionProps = () => {
    if (!isListed) {
      return {
        text: "Property bought",
        onClick: undefined,
        disabled: true,
        "aria-label": "Property has been bought",
      };
    }

    const props = {
      buyer: {
        text: "Buy Now",
        onClick: handleBuy,
        disabled: propertyState.hasBeenBought,
        "aria-label": `Buy property at ${property.address} for ${price.value} ETH`,
      },
      inspector: {
        text: "Approve inspection",
        onClick: handleInspect,
        disabled: propertyState.hasBeenInspected,
        "aria-label": "Approve property inspection",
      },
      seller: {
        text: "Approve & sell",
        onClick: handleSell,
        disabled: propertyState.hasBeenSold,
        "aria-label": "Approve and sell property",
      },
      lender: {
        text: "Approve & lend",
        onClick: handleLend,
        disabled: propertyState.hasBeenLent,
        "aria-label": "Approve and provide lending for property",
      },
    };

    return userRole ? props[userRole] : null;
  };

  const renderActionButton = () => {
    const primaryActionProps = getPrimaryActionProps();

    if (!primaryActionProps) return null;
    const { text, ...props } = primaryActionProps;

    return (
      <Button
        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
        {...props}
      >
        {text}
      </Button>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-2xl font-bold text-purple-900">
          {property.name}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Property details for {property.name} located at {property.address}
        </DialogDescription>

        <div className="space-y-6">
          <div className="relative">
            <Image
              src={property.image}
              alt={`${property.name} - Detailed property view`}
              width={600}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <section aria-labelledby="property-price">
            <h3
              id="property-price"
              className="text-3xl font-bold text-purple-900 mb-2"
            >
              {price.value} ETH
            </h3>
            <p className="text-gray-600 flex items-center gap-1">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{property.address}</span>
            </p>
          </section>

          <section aria-labelledby="property-highlights">
            <h4 id="property-highlights" className="sr-only">
              Property Highlights
            </h4>
            <ul
              className="grid grid-cols-3 gap-4 p-4 bg-purple-50 rounded-lg"
              aria-label="Property highlights"
            >
              {restAttributes.slice(0, 3).map((attribute) => {
                const Icon =
                  iconByType[attribute.trait_type as keyof typeof iconByType];

                return (
                  <li key={attribute.trait_type} className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Icon
                        className="h-5 w-5 text-purple-600"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-semibold text-purple-900">
                      {attribute.value}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="property-actions">
            <h4 id="property-actions" className="sr-only">
              Property Actions
            </h4>
            <div className="flex gap-3">
              {renderActionButton()}
              <Button
                variant="outline"
                className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent cursor-pointer"
                aria-label="Contact property agent"
              >
                Contact Agent
              </Button>
            </div>
          </section>

          <Separator />

          <section aria-labelledby="property-overview">
            <h4
              id="property-overview"
              className="text-lg font-semibold text-purple-900 mb-3"
            >
              Overview
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </section>

          <Separator />

          <section aria-labelledby="property-details">
            <h4
              id="property-details"
              className="text-lg font-semibold text-purple-900 mb-4"
            >
              Property Details
            </h4>
            <ul
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              aria-label="Detailed property information"
            >
              {attributes.map((attribute) => {
                return (
                  <li
                    key={`${attribute.trait_type}-details`}
                    className="flex justify-between"
                  >
                    <span className="text-gray-600">
                      {attribute.trait_type}
                    </span>
                    <span className="font-medium text-gray-900">
                      {attribute.value}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
