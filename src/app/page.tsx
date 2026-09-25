import { Hero } from "@/components/sections/Hero";
import { AboutTeaser, Closing, FeaturedWork, Immersive, Industries, Services, TechMarquee, Values } from "@/components/sections/Home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <AboutTeaser />
      <Services />
      <Immersive />
      <Industries />
      <FeaturedWork />
      <Values />
      <Closing />
    </>
  );
}
