import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PropertyType } from "@/types/listing";
import { iconByType } from "@/consts/listing";

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
  if (!property) return null;

  const { attributes } = property;
  const [price, type, ...restAttributes] = attributes;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-900">
            {property.name}
          </DialogTitle>
        </DialogHeader>

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
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
              Buy Now
            </Button>
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
