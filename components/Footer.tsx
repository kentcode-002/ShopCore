import Link from "next/link";
import FooterLink from "./FooterLink";

const Footer = () => {
  return (
    <div className="border-t border px-5 py-10 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-center">
        <div>
          <p className="font-bold text-base lg:text-base mb-2">Resources</p>
          <div className="grid grid-cols-1 gap-4">
            <FooterLink href="#">Become a member</FooterLink>
            <FooterLink href="#">Product advice</FooterLink>
            <FooterLink href="#">Send us feedback</FooterLink>
          </div>
        </div>
        <div>
          <p className="font-bold text-base lg:text-base mb-2">Help</p>
          <div className="grid grid-cols-1 gap-4">
            <FooterLink href="#">get help</FooterLink>
            <FooterLink href="#">delivery</FooterLink>
            <FooterLink href="#">order status</FooterLink>
            <FooterLink href="#">contact us</FooterLink>
          </div>
        </div>
        <div>
          <p className="font-bold text-base lg:text-base mb-2">Company</p>
          <div className="grid grid-cols-1 gap-4">
            <FooterLink href="#">About us</FooterLink>
            <FooterLink href="#">news</FooterLink>
            <FooterLink href="#">report a concern</FooterLink>
          </div>
        </div>
      </div>
      <div className="mt-8 text-[gray] lg:text-center text-base lg:text-base">
        <p className="capitalize">
          © {new Date().getFullYear()} Shopify. all rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
