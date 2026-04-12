import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import Highlights from "@/components/Highlights";

export default async function Home() {
  let products: any[] = [];

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
    <div className="relative">
      <Hero />
      <CategorySection />
      <Highlights products={products} />
    </div>
  );
}
