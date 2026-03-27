import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { auth } from "@/auth";
import { headers } from "next/headers";
import Subheader from "@/components/SubHeader";

export default async function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <div>
      <Header session={session} />
      <Subheader />
      {children}
      <Footer />
    </div>
  );
}
