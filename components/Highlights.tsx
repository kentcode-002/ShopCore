import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

const Highlights = ({ products }: { products: Product[] }) => {
  const filterProducts = products.filter(
    (product) =>
      product.category === "men's clothing" ||
      product.category === "women's clothing"
  );

  return (
    <section className="px-10 md:px-20 mt-12">
      <p className="text-center text-sm md:text-2xl font-bold">Featured</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-8 mt-4">
        {filterProducts.map((product) => (
          <div key={product.id} className="flex flex-col justify-center gap-2">
            <Link href={`/product/${product.id}`}>
              <div className="relative productBg w-full h-40 md:h-50 cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </Link>
            <p className="text-sm md:text-base font-bold w-full truncate">
              {product.title}
            </p>
            <p className="text-sm md:text-base font-semibold">
              $ {product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
