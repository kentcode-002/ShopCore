import Collections from "./Collections";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
export default async function CollectionPage() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store"
  });

  const products: Product[] = await res.json();

  return (
    <div>
      <Collections products={products} />
    </div>
  );
}
