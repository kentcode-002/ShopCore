"use client";

import Link from "next/link";
import {
  ChevronRight,
  CircleQuestionMark,
  LogOut,
  Menu,
  ShoppingCart,
  Store,
  User,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";

interface HeaderProps {
  session: {
    user: {
      id: string;
      name: string;
      email: string;
    };
  } | null;
}

const icons = "lg:hidden w-7 h-7 lg:w-5 lg:h-5";
const links = "flex items-center justify-between text-2xl font-[500]";
const secondaryLinks = "flex items-center text-lg gap-4 font-[500]";

const Header = ({ session }: HeaderProps) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [count, setCount] = useState<number>(0);

  // Disable background scroll when menu is active
  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuActive]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!session) return;

        const res = await fetch(`/api/cart?userId=${session.user.id}`);

        const data = await res.json();
        setCount(data.count);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [session]);

  return (
    <>
      <div className="sticky top-0 lg:relative flex items-center justify-between lg:justify-end px-4 lg:px-20 py-2 bg-[#f5f5f5] z-50">
        <Link href="/">
          <p className="text-sm md:text-base lg:hidden font-bold">Shopify</p>
        </Link>

        {session ? (
          <div className="hidden lg:flex gap-2 text-xs font-bold">
            <Link href="#">
              <p>Hi, {session?.user?.name}</p>
            </Link>
            <span>|</span>
            <Link href="#">
              <p>Help</p>
            </Link>
            <span>|</span>
            <LogoutButton />
          </div>
        ) : (
          <div className="hidden lg:flex gap-2 text-sm font-semibold">
            <Link href={session ? "#" : "/login"}>Login</Link>
            <span>|</span>
            <Link href={session ? "#" : "/signup"}>SignUp</Link>
          </div>
        )}

        <div className="flex items-center text-xs gap-4 lg:hidden">
          <Link href={session ? "#" : "/login"}>
            <User className="w-4 h-4" />
          </Link>
          <Link
            href={session ? "#" : "/login"}
            className="flex items-center gap-1"
          >
            <ShoppingCart className="w-4 h-4" />
            {count}
          </Link>
          <Menu
            className="w-4 h-4"
            onClick={() => setIsMenuActive(!isMenuActive)}
          />
        </div>
      </div>

      {isMenuActive && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="relative w-[85%] bg-white p-6 overflow-y-scroll">
            <div className="flex justify-end">
              <X
                className="w-6 h-6 cursor-pointer"
                onClick={() => setIsMenuActive(false)}
              />
            </div>
            <nav className="mt-8 flex flex-col gap-8">
              <Link href="#" className={links}>
                <span>Men</span>
                <span>
                  <ChevronRight />
                </span>
              </Link>
              <Link href="#" className={links}>
                <span>Women</span>
                <span>
                  <ChevronRight />
                </span>
              </Link>
              <Link href="#" className={links}>
                <span>Others</span>
                <span>
                  <ChevronRight />
                </span>
              </Link>
              <Link href="#" className={links}>
                <span className="uppercase text-xl">Download the app now</span>
              </Link>
            </nav>
            <div className="h-px w-full bg-[black] text-center mt-12"></div>
            <div className="mt-12">
              <nav className="flex flex-col gap-4">
                <Link
                  href={session ? "/collections" : "/login"}
                  className={secondaryLinks}
                >
                  <User />
                  <span>Account</span>
                </Link>
                <Link
                  href={session ? "/collections" : "/login"}
                  className={secondaryLinks}
                >
                  <ShoppingCart />
                  <span>Cart</span>
                </Link>
                <Link href="#" className={secondaryLinks}>
                  <Store />
                  <span>Find A Store</span>
                </Link>
                <Link href="#" className={secondaryLinks}>
                  <CircleQuestionMark />
                  <span>Help</span>
                </Link>
              </nav>
            </div>
            {session && (
              <div className="absolute bottom-5 mt-8 flex items-center gap-2 text-[red]">
                <LogOut className="w-5 h-5" />
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
