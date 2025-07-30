type PropertyAttribute = {
  trait_type: string;
  value: string | number;
};

export type PropertyType = {
  address: string;
  description: string;
  id: string;
  image: string;
  name: string;
  attributes: PropertyAttribute[];
};
