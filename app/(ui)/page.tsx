import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import Highlights from "@/components/Highlights";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products: any[] = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store"
    });

    console.log("STATUS:", res.status);
    console.log("OK:", res.ok);

    const text = await res.text();

    console.log("RAW RESPONSE:", text);

    if (!res.ok) {
      throw new Error(`Failed with status ${res.status}`);
    }

    products = JSON.parse(text);
  } catch (error) {
    console.error("FULL ERROR:", error);
  }

  return (
    <div className="relative">
      <Hero />
      <CategorySection />
      <Highlights products={products} />
    </div>
  );
}
