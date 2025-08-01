"use client";

import { ListingCard } from "@/components/listing/ListingCard";
import { useState } from "react";

import { HomepageListingsContainer } from "@/components/homepage/HomepageListingsContainer";
import { HomepageHeading } from "@/components/homepage/HomepageTitle";
import { ListingCardSkeleton } from "@/components/listing/ListingCardSkeleton";
import { ListingDialog } from "@/components/listing/ListingDialog";
import { useGetProperties } from "@/hooks/useGetProperties";
import { useGetTotalSupply } from "@/hooks/useGetTotalSupply";
import { PropertyType } from "@/types/listing";

export default function Home() {
  const { totalSupply, isLoading: isLoadingTotalSupply } = useGetTotalSupply();
  const { properties, isLoading: isLoadingProperties } = useGetProperties();

  // Dialog
  const [isPropertyDialogVisible, setIsPropertyDialogVisible] = useState(false);
  const [propertySelected, setPropertySelected] = useState<PropertyType>();

  const handleClickViewMore = (id: string) => {
    setIsPropertyDialogVisible(true);
    setPropertySelected(() => {
      return properties.find((property) => property.id === id);
    });
  };

  const getContent = () => {
    if (isLoadingProperties || isLoadingTotalSupply) {
      return (
        <>
          <HomepageHeading>
            <div className="h-8 w-1/4 bg-gray-200 rounded-full animate-pulse" />
          </HomepageHeading>
          <HomepageListingsContainer>
            {Array.from({ length: 6 }).map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))}
          </HomepageListingsContainer>
        </>
      );
    }

    return (
      <>
        <HomepageHeading>
          {totalSupply} available properties for you
        </HomepageHeading>
        <HomepageListingsContainer>
          {properties.map((property, index) => (
            <ListingCard
              key={`${property.id}-${index}`}
              property={property}
              onClickViewMore={handleClickViewMore}
            />
          ))}
        </HomepageListingsContainer>
      </>
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto my-0 py-0 px-5">{getContent()}</div>
      {propertySelected ? (
        <ListingDialog
          property={propertySelected}
          isOpen={isPropertyDialogVisible}
          onOpenChange={(isOpen) => {
            setPropertySelected(undefined);
            setIsPropertyDialogVisible(isOpen);
          }}
        />
      ) : null}
    </>
  );
}
