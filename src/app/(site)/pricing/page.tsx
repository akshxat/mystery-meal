import Breadcrumb from "@/components/Common/Breadcrumb";
// import Faq from "@/components/Faq";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "MysteryPlus+ | Mystery Meal🔮✨",
  description: "This is pricing page description",
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb pageName="Pricing Page" />
      <Pricing />
      {/* <Faq /> */}
    </>
  );
};

export default PricingPage;
