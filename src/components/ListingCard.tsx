import { Bath, Bed, Car, MapPin, Square } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ListingCard = () => {
  return (
    <Card className="w-full max-w-md overflow-hidden shadow-lg border-0 bg-white py-0">
      <div className="relative">
        <Image
          src="https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png"
          alt="Modern luxury home"
          width={400}
          height={240}
          className="w-full h-60 object-cover"
        />
      </div>

      <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-1">
              $1,250,000
            </h2>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              2847 Maple Street, Beverly Hills, CA 90210
            </p>
          </div>

          <div className="flex items-center gap-6 text-gray-700">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span className="text-sm font-medium">4</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span className="text-sm font-medium">3</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span className="text-sm font-medium">2,400 sqft</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-lg bg-transparent cursor-pointer"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
