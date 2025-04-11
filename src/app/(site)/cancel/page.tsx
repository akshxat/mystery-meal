"use client";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <h1 className="text-4xl font-bold text-red-800 mb-4">Payment Cancelled</h1>
      <p className="text-lg text-red-700">
        Your payment has been cancelled. If this was a mistake, please try again.
      </p>
      <p className="mt-6 text-gray-600">
        If you have any questions, please contact our support team.
      </p>
    </div>
  );
}