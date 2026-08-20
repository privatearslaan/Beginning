export type CartLineItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: { toString(): string };
    images: unknown;
    stock: number;
  };
};

export function priceAsDecimal(value: number): { toString(): string } {
  return {
    toString() {
      return value.toString();
    },
  };
}
