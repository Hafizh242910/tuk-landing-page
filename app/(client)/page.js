import AboutSeciton from "@/components/AboutSeciton";
import ContactSection from "@/components/ContactSection";
import HeroScetion from "@/components/HeroScetion";
import AnimatedFloatingButton from "@/components/AnimatedFloatingButton";

const page = ({ children }) => {
  return (
    <>
      <HeroScetion />
      <AboutSeciton />
      <ContactSection />
      <AnimatedFloatingButton />
    </>
  );
};

export default page;
