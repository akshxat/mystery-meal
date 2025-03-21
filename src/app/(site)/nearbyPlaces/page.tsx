import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";
import NearbyPlace from "@/components/NearbyPlaces";


// interface NearbyPlacesProps {
//   location: { lat: number; lng: number };
//   radius: number;
//   type?: string;
// }

export const metadata: Metadata = {
  title:
    "Pricing Page | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "This is pricing page description",
};

const NearbyPlaces = () => {
  const location = { lat: 37, lng: -122 }; // Example coordinates (San Francisco)
  const radius = 1500; // Radius in meters
  const type = 'restaurant'; // Optional: specify a place type
  
  return (
    <>
    <Breadcrumb pageName="Nearby Places" />
    <NearbyPlace location={location} radius={radius} type={type}></NearbyPlace>
    </>
  );
};

export default NearbyPlaces;