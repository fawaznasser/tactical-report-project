"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth");

    console.log("isAuthenticated:", isAuthenticated);

    if (!isAuthenticated) {
      console.log("Redirecting to /items/login");
      router.push("/items/login");
    } else {
      console.log("Redirecting to /items/components");
      router.push("/items/components");
    }
  }, [router]);

  return <div>Loading...</div>;
}
