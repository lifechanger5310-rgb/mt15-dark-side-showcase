import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Specs } from "@/components/sections/Specs";
import { Colorways } from "@/components/sections/Colorways";
import { Features } from "@/components/sections/Features";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Specs />
        <Colorways />
        <Features />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
