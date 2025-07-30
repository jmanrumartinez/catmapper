import { MapPin } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ListingAttributes } from "./ListingAttributes";
import { PropertyType } from "@/types/listing";

export type ListingCardType = {
  property: PropertyType;
  onClickViewMore: (id: string) => void;
};

export const ListingCard = ({ property, onClickViewMore }: ListingCardType) => {
  const { address, id, description, image, attributes } = property;
  const price = attributes[0];

  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-lg border-0 bg-white py-0">
      <div className="relative">
        <Image
          src={image}
          alt={description}
          width={400}
          height={240}
          priority
          className="w-full h-60 object-cover"
        />
      </div>

      <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-1">
              {price.value} ETH
            </h2>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {address}
            </p>
          </div>

          <ListingAttributes attributes={attributes} />

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-lg bg-transparent cursor-pointer"
              onClick={() => onClickViewMore(id)}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
