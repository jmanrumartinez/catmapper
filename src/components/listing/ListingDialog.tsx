import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Badge, MapPin, Bed, Bath, Square, Car } from "lucide-react";

type ListingDialogTypes = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export const ListingDialog = ({ isOpen, onOpenChange }: ListingDialogTypes) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-900">
            Luxury Modern Home in Beverly Hills
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Image */}
          <div className="relative">
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="Modern luxury home - detailed view"
              width={600}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white">
              For Sale
            </Badge>
          </div>

          {/* Price and Address */}
          <div>
            <h3 className="text-3xl font-bold text-purple-900 mb-2">
              $1,250,000
            </h3>
            <p className="text-gray-600 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              2847 Maple Street, Beverly Hills, CA 90210
            </p>
          </div>

          {/* Property Attributes */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-purple-50 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Bed className="h-5 w-5 text-purple-600" />
              </div>
              <p className="font-semibold text-purple-900">4</p>
              <p className="text-sm text-gray-600">Bedrooms</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Bath className="h-5 w-5 text-purple-600" />
              </div>
              <p className="font-semibold text-purple-900">3</p>
              <p className="text-sm text-gray-600">Bathrooms</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Square className="h-5 w-5 text-purple-600" />
              </div>
              <p className="font-semibold text-purple-900">2,400</p>
              <p className="text-sm text-gray-600">Sq Ft</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Car className="h-5 w-5 text-purple-600" />
              </div>
              <p className="font-semibold text-purple-900">2</p>
              <p className="text-sm text-gray-600">Garage</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
              Buy Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              Contact Agent
            </Button>
          </div>

          <Separator />

          {/* Overview Section */}
          <div>
            <h4 className="text-lg font-semibold text-purple-900 mb-3">
              Overview
            </h4>
            <p className="text-gray-700 leading-relaxed">
              This stunning modern home offers the perfect blend of luxury and
              comfort in the heart of Beverly Hills. Featuring an open-concept
              floor plan with soaring ceilings, the home boasts a gourmet
              kitchen with premium stainless steel appliances, quartz
              countertops, and a large island perfect for entertaining. The
              master suite includes a walk-in closet and spa-like bathroom with
              dual vanities and a soaking tub. The beautifully landscaped
              backyard features a pool, outdoor kitchen, and multiple seating
              areas ideal for California indoor-outdoor living.
            </p>
          </div>

          <Separator />

          {/* Property Details */}
          <div>
            <h4 className="text-lg font-semibold text-purple-900 mb-4">
              Property Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium text-gray-900">
                    Single Family Home
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built:</span>
                  <span className="font-medium text-gray-900">2019</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lot Size:</span>
                  <span className="font-medium text-gray-900">0.25 acres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">HOA Fees:</span>
                  <span className="font-medium text-gray-900">$250/month</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Heating:</span>
                  <span className="font-medium text-gray-900">Central Air</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cooling:</span>
                  <span className="font-medium text-gray-900">Central Air</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Flooring:</span>
                  <span className="font-medium text-gray-900">
                    Hardwood, Tile
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">MLS #:</span>
                  <span className="font-medium text-gray-900">12345678</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div>
            <h4 className="text-lg font-semibold text-purple-900 mb-3">
              Features & Amenities
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "Swimming Pool",
                "Outdoor Kitchen",
                "Walk-in Closets",
                "Granite Countertops",
                "Stainless Appliances",
                "Hardwood Floors",
                "Security System",
                "Landscaped Yard",
                "Two-Car Garage",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
