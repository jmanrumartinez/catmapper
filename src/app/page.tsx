"use client";

import { ListingCard } from "@/components/listing/ListingCard";
import { NavigationBar } from "@/components/shared/navigation/NavigationBar";
import { useState } from "react";

import { ListingDialog } from "@/components/listing/ListingDialog";
import { PropertyType } from "@/types/listing";
import { useGetTotalSupply } from "@/hooks/useGetTotalSupply";
import { useGetProperties } from "@/hooks/useGetProperties";

export default function Home() {
  const { totalSupply } = useGetTotalSupply();
  const { properties } = useGetProperties();

  // Dialog
  const [isPropertyDialogVisible, setIsPropertyDialogVisible] = useState(false);
  const [propertySelected, setPropertySelected] = useState<PropertyType>();

  const handleClickViewMore = (id: string) => {
    setIsPropertyDialogVisible(true);
    setPropertySelected(() => {
      return properties.find((property) => property.id === id);
    });
  };

  return (
    <div>
      <NavigationBar />
      <div className="max-w-7xl mx-auto my-0 py-0 px-5">
        <h3 className="mt-12 mx-0 mb-5 text-2xl font-bold">
          {totalSupply} available properties for you
        </h3>
        <div className="grid gap-2.5 grid-cols-[repeat(auto-fit,minmax(min(100%,350px),1fr))]">
          {properties.map((property) => (
            <ListingCard
              key={property.id}
              property={property}
              onClickViewMore={handleClickViewMore}
            />
          ))}
        </div>
      </div>
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
    </div>
  );
}
