"use client";

import { useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  setTimeout(() => {
    router.push("/signin");
  }, 900);

  setTimeout(() => {
    signOut();
  }, 1500);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Payment Successful!</h1>
      {sessionId ? (
        <p className="text-lg text-green-700">Your session ID: {sessionId}</p>
      ) : (
        <p className="text-lg text-green-700">No session ID found.</p>
      )}
      <p className="mt-6 text-gray-600">
        Thank you for your purchase. You will be redirected shortly...
      </p>
    </div>
  );
}