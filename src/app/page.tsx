import About from "@/components/About";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import CallToAction from "@/components/CallToAction";
import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import NearbyPlaces from "@/components/NearbyPlaces";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";
import MysteryMeal from "@/components/MysteryMeal";

export const metadata: Metadata = {
  title: "Mystery Meal🔮✨",
  description: "Where will your next meal take you?",
};

export default function Home() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <ScrollUp />
      <Hero />
      <MysteryMeal />
      {/* <Features /> */}
      {/* <About />
      <CallToAction /> */}
      <Pricing />
      {/* <Testimonials />
      <Faq />
      <Team />
      <HomeBlogSection posts={posts} />
      <Contact />
      <Clients /> */
      // <NearbyPlaces location={{
      //   lat: 0,
      //   lng: 0
      // }} radius={0} />
      }
    </main>
  );
}
