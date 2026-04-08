import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center px-4 sm:px-6 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-image.jpg"
        alt="Hero background showcasing ShopCore lifestyle products"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70 -z-10" />

      {/* Content */}
      <div className="flex flex-col items-center gap-5 text-center text-white z-10 max-w-4xl mx-auto">
        {/* Eyebrow tag */}
        {/* <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-amber-400 border border-amber-400/50 px-4 py-1.5 rounded-full backdrop-blur-sm bg-amber-400/10">
          New Collection — 2025
        </span> */}

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
          Upgrade Your Lifestyle
          <br />
          <span className="text-amber-400">Today at ShopCore</span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/75 max-w-xl leading-relaxed font-normal">
          Discover products crafted to elevate your everyday life — from fashion
          to essentials, all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
          <Link
            href="/collections"
            className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm sm:text-base rounded-xl transition-colors duration-200 tracking-wide"
          >
            Shop the Collection
          </Link>
          <Link
            href="/about"
            className="px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm sm:text-base rounded-xl transition-colors duration-200 tracking-wide"
          >
            Learn More
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-white/60 text-xs sm:text-sm font-medium">
          <span className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-amber-400"
            >
              <path
                fillRule="evenodd"
                d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.741-3.08Z"
                clipRule="evenodd"
              />
            </svg>
            Secure Checkout
          </span>
          {/* <span className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-amber-400"
            >
              <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a3 3 0 1 1 6 0h.375c1.035 0 1.875-.84 1.875-1.875V15h-9Z" />
              <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
              <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
            </svg>
            Free Shipping over ₱999
          </span> */}
          <span className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-amber-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            Top-Rated Products
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
