import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PropertyType } from "@/types/listing";
import { iconByType } from "@/consts/listing";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { areAddressesEqual } from "@/lib/utils";
import { useAccount } from "wagmi";

type ListingDialogTypes = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  property: PropertyType;
  escrow: ethers.Contract;
  provider: ethers.BrowserProvider;
};

export const ListingDialog = ({
  escrow,
  isOpen,
  onOpenChange,
  property,
  provider,
}: ListingDialogTypes) => {
  const account = useAccount();

  const [stakeholders, setStakeholders] = useState<Record<string, string>>({});
  const { attributes, id } = property;
  const [price, type, ...restAttributes] = attributes;
  const [propertyState, setPropertyState] = useState<Record<string, boolean>>(
    {}
  );

  const fetchOwner = useCallback(async () => {
    const isListed = await escrow.isListed(id);
    if (isListed) return;

    const owner = await escrow.getBuyer(id);
    setStakeholders((prevStakeholders) => ({
      ...prevStakeholders,
      owner,
    }));
  }, [escrow, id]);

  const initializeData = useCallback(async () => {
    const buyer = await escrow.getBuyer(id);
    const seller = await escrow.seller();
    const lender = await escrow.lender();
    const inspector = await escrow.inspector();

    setStakeholders({
      buyer,
      seller,
      lender,
      inspector,
    });

    const hasBought = await escrow.hasApproved(id, buyer);
    const hasLended = await escrow.hasApproved(id, lender);
    const hasInspected = await escrow.hasPassedInspection(id);
    const hasSold = await escrow.hasApproved(id, seller);

    setPropertyState({
      hasBought,
      hasLended,
      hasInspected,
      hasSold,
    });
  }, [escrow, id]);

  useEffect(() => {
    initializeData().then(() => fetchOwner());
  }, [initializeData, fetchOwner]);

  const handleBuy = async () => {
    const escrowAmount = await escrow.getEscrowAmount(id);
    const signer = await provider.getSigner();

    let transaction = await escrow
      .connect(signer)
      .depositEscrow(id, { value: escrowAmount });
    await transaction.wait();

    transaction = await escrow.connect(signer).approveSale(id);
    await transaction.wait();

    setPropertyState((prevState) => ({
      ...prevState,
      hasBought: true,
    }));
  };
  const handleInspect = async () => {
    const signer = await provider.getSigner();

    const transaction = await escrow
      .connect(signer)
      .setInspectionStatus(id, true);
    await transaction.wait();

    setPropertyState((prevState) => ({
      ...prevState,
      hasInspected: true,
    }));
  };
  const handleLend = async () => {
    const signer = await provider.getSigner();
    const transaction = await escrow.connect(signer).approveSale(id);
    await transaction.wait();

    const lendAmount =
      (await escrow.getPurchasePrice(id)) - (await escrow.getEscrowAmount(id));

    await signer.sendTransaction({
      to: await escrow.getAddress(),
      value: lendAmount.toString(),
      gasLimit: 60000,
    });

    setPropertyState((prevState) => ({
      ...prevState,
      hasLended: true,
    }));
  };
  const handleSell = async () => {
    const signer = await provider.getSigner();
    let transaction = await escrow.connect(signer).approveSale(id);
    await transaction.wait();

    transaction = await escrow.connect(signer).finalizeSale(id);
    await transaction.wait();

    setPropertyState((prevState) => ({
      ...prevState,
      hasSold: true,
    }));
  };

  // TODO: Please refactor this!!! This is so ugly lol
  const renderActionButton = () => {
    if (stakeholders.owner) {
      return (
        <Button
          disabled
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
        >
          Property owned
        </Button>
      );
    }

    if (
      account.address &&
      areAddressesEqual(account.address, stakeholders.buyer)
    ) {
      return (
        <Button
          onClick={handleBuy}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
          disabled={propertyState.hasBought}
        >
          Buy Now
        </Button>
      );
    }

    if (
      account.address &&
      areAddressesEqual(account.address, stakeholders.inspector)
    ) {
      return (
        <Button
          onClick={handleInspect}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
          disabled={propertyState.hasInspected}
        >
          Approve inspection
        </Button>
      );
    }

    if (
      account.address &&
      areAddressesEqual(account.address, stakeholders.seller)
    ) {
      return (
        <Button
          onClick={handleSell}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
          disabled={propertyState.hasSold}
        >
          Approve & sell
        </Button>
      );
    }

    if (
      account.address &&
      areAddressesEqual(account.address, stakeholders.lender)
    ) {
      return (
        <Button
          onClick={handleLend}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
          disabled={propertyState.hasLended}
        >
          Approve & lend
        </Button>
      );
    }
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
          <Image
            src={property.image}
            alt="Modern luxury home - detailed view"
            width={600}
            height={300}
            className="w-full h-64 object-cover rounded-lg"
          />

          <div>
            <h3 className="text-3xl font-bold text-purple-900 mb-2">
              {price.value} ETH
            </h3>
            <p className="text-gray-600 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {property.address}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-purple-50 rounded-lg">
            {restAttributes.slice(0, 3).map((attribute) => {
              const Icon =
                iconByType[attribute.trait_type as keyof typeof iconByType];

              return (
                <div key={attribute.trait_type} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="font-semibold text-purple-900">
                    {attribute.value}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            {Object.keys(stakeholders).length ? renderActionButton() : null}
            <Button
              variant="outline"
              className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent  cursor-pointer"
            >
              Contact Agent
            </Button>
          </div>

          <Separator />

          <div>
            <h4 className="text-lg font-semibold text-purple-900 mb-3">
              Overview
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="text-lg font-semibold text-purple-900 mb-4">
              Property Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attributes.map((attribute) => {
                return (
                  <div
                    key={`${attribute.trait_type}-details`}
                    className="flex justify-between"
                  >
                    <span className="text-gray-600">
                      {attribute.trait_type}
                    </span>
                    <span className="font-medium text-gray-900">
                      {attribute.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
