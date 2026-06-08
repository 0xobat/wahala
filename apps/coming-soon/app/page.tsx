import Hero from "@/components/sections/Hero";
import Voice from "@/components/sections/Voice";
import Boarding from "@/components/sections/Boarding";
import Chillo from "@/components/sections/Chillo";
import Chrome from "@/components/Chrome";
import ScanlineOverlay from "@/components/ScanlineOverlay";
import GlobalAnimations from "@/components/GlobalAnimations";

export default function Page() {
  return (
    <>
      <ScanlineOverlay />
      <Chrome />
      <Hero />
      <Voice />
      <Boarding />
      <Chillo />
      <GlobalAnimations />
    </>
  );
}
