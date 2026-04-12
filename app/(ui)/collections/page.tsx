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
  let products: Product[] = [];

  // 🔹 Safe fetch
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 } // cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await res.json();
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
