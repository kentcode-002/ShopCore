import Link from "next/link";
import { ReactNode } from "react";

type FooterLinkProps = {
  href: string;
  children: ReactNode;
};

const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <Link
      href={href}
      className="capitalize text-gray-500 font-semibold text-sm hover:font-bold hover:text-black transition-all duration-200"
    >
      {children}
    </Link>
  );
};

export default FooterLink;
