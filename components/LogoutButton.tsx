"use client";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };
  return (
    <button onClick={handleSignOut} className="cursor-pointer">
      Logout
    </button>
  );
};

export default LogoutButton;
