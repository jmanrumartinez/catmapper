import { iconByType } from "@/consts/listing";
import { ListingCardType } from "./ListingCard";

type ListingAttributesType = {
  attributes: ListingCardType["property"]["attributes"];
};

export const ListingAttributes = ({ attributes }: ListingAttributesType) => {
  const filteredAttributes = attributes.filter(
    (attribute) => attribute.trait_type !== "Purchase Price"
  );

  return (
    <ul
      className="grid grid-cols-3 gap-2 text-gray-700"
      aria-label="Property attributes"
    >
      {filteredAttributes.map((attribute) => {
        const Icon =
          iconByType[attribute.trait_type as keyof typeof iconByType];
        return (
          <li
            key={attribute.trait_type}
            className="flex items-center gap-1"
            role="listitem"
          >
            {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
            <span className="text-sm font-medium line-clamp-1">
              {attribute.value}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
