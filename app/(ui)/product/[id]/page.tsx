import { auth } from "@/auth";
import Product from "./Product";
import { headers } from "next/headers";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers()
  });

  return <Product session={session} productId={id} />;
}
