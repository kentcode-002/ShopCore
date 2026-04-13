import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import Highlights from "@/components/Highlights";

export default async function Home() {
  let products: any[] = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    products = data;
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

  return (
    <div className="relative">
      <Hero />
      <CategorySection />
      <Highlights products={products} />
    </div>
  );
}
