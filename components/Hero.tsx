import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center px-4 sm:px-6">
      {/* Text overlay */}
      <div className="flex flex-col gap-4 text-center text-white z-10">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Upgrade Your Lifestyle Today at Shopify
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
          Discover products to elevate your everyday life fashion
        </p>
        <div className="mt-4">
          <Link
            href="/collections"
            className="text-base sm:text-lg md:text-xl px-3 sm:px-4 py-2 text-white font-semibold border border-white cursor-pointer"
          >
            Shop the Collection
          </Link>
        </div>
      </div>

      {/* Background image */}
      <Image
        src="/images/hero-image.jpg"
        alt="Hero"
        fill
        className="object-cover lg:object-fill -z-10"
      />
    </div>
  );
};

export default Hero;
