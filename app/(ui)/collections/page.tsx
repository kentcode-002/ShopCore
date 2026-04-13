import Collections from "./Collections";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const dynamic = "force-dynamic"; // 👈 skip static generation

export default async function CollectionPage() {
  let products: Product[] = [];

  // 🔹 Safe fetch
  try {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    products = data;
  } catch (error) {
    console.error("Error fetching products:", error);
    products = []; // fallback
  }

  return (
    <div>
      <Collections products={products} />
    </div>
  );
}
