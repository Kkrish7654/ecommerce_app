export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  thumbnail: string;
};

export interface ProductProps {
  data: ProductType[];
}
