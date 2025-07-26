import AboutSeciton from "@/components/AboutSeciton";
import ContactSection from "@/components/ContactSection";
import HeroScetion from "@/components/HeroScetion";

const page = ({ children }) => {
  return (
    <>
      <HeroScetion />
      <AboutSeciton />
      <ContactSection />
    </>
  );
};

export default page;
