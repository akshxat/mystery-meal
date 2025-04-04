import { Price } from "@/types/price";

export const pricingData: Price[] = [
  {
    id: "price_1RA9sw2cBQ9g9xkYJFlrHEBP",
    unit_amount: 3.50 * 100,
    nickname: "MysteryPlus+ Monthly",
    recurrance: "month",
    offers: [
      "Unlimited custom AI powered filters",
      "Cuisine",
      "Dishes",
      "Specialities",
      "Renews monthly",
    ],
  },
  {
    id: "price_1RA9tu2cBQ9g9xkYZzBd284g",
    unit_amount: 30 * 100,
    nickname: "MysteryPlus+ Annual",
    recurrance: "year",
    offers: [
      "Unlimited custom AI powered filters",
      "Cuisine",
      "Dishes",
      "Specialities",
      "Renews annually",
      "Save 5%",
    ],
  },
  // {
  //   id: "price_1NQk4eLtGdPVhGLeZsZDsCNz",
  //   unit_amount: 300 * 100,
  //   nickname: "Business",
  //   offers: [
  //     "10 Users",
  //     "All UI components",
  //     "Lifetime access",
  //     "Free updates",
  //     "Use on 1 (one) project",
  //     "3 Months support",
  //   ],
  // },
];
