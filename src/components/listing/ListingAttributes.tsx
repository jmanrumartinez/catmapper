import { Bath, Bed, Square, House, Calendar } from "lucide-react";
import { ListingCardType } from "./ListingCard";
import { createElement } from "react";

type ListingAttributesType = {
  attributes: ListingCardType["property"]["attributes"];
};

const iconByType = {
  "Type of Residence": House,
  "Bed Rooms": Bed,
  Bathrooms: Bath,
  "Square Feet": Square,
  "Year Built": Calendar,
};

export const ListingAttributes = ({ attributes }: ListingAttributesType) => {
  return (
    <div className="grid grid-cols-3 gap-2 text-gray-700">
      {attributes.map((attribute) => {
        if (attribute.trait_type === "Purchase Price") return;

        const Icon =
          iconByType[attribute.trait_type as keyof typeof iconByType];
        return (
          <div key={attribute.trait_type} className="flex items-center gap-1">
            {Icon && <Icon className="h-4 w-4" />}
            <span className="text-sm font-medium line-clamp-1">
              {attribute.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};
