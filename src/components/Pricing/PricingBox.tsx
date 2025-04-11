import axios from "axios";
import React from "react";
import OfferList from "./OfferList";
import { Price } from "@/types/price";
import { useSession } from "next-auth/react";

const PricingBox = ({ product }: { product: Price }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleSubscription = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/api/payment",
        {
          priceId: product.id,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (data.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("Missing redirect URL from Stripe");
      }
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  };

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div
        className="relative z-10 h-full overflow-hidden rounded-xl bg-white px-6 py-10 shadow-md dark:bg-dark-2 sm:p-10 lg:p-8 xl:p-12 flex flex-col justify-between"
        data-wow-delay=".1s"
      >
        {product.nickname === "Premium" && (
          <p className="absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-white">
            Recommended
          </p>
        )}

        <div>
          <span className="mb-4 block text-xl font-medium text-dark dark:text-white">
            {product.nickname}
          </span>
          <h2 className="mb-8 text-4xl font-semibold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21]">
            <span className="text-xl font-medium">$ </span>
            <span className="-ml-1 -tracking-[2px]">
              {(product.unit_amount / 100).toLocaleString("en-US", {
                currency: "CAD",
              })}
            </span>
            <span className="text-base font-normal text-body-color dark:text-dark-6">
              {" "}
              Per {product.recurrance}
            </span>
          </h2>

          <div className="mb-8">
            <h3 className="mb-4 text-lg font-medium text-dark dark:text-white">
              Features
            </h3>
            <div className="space-y-3">
              {product?.offers.map((offer, i) => (
                <OfferList key={i} text={offer} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <button
            onClick={handleSubscription}
            className="w-full rounded-md bg-primary px-6 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-primary/90"
          >
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingBox;
