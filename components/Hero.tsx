import React from "react";
import { LogoTicker } from "./LogoTicker";
import MarketingSolutions from "./MarketingSolutions";
import { GlideUpSpan } from "./ui/Glideupspan";
import ReelStack from "./ui/ReelStack";
import SpotlightCarousel from "./ui/SpotLightCarousal";


const Hero = () => {
  return (
    // No background here — page.tsx owns the global bg, grid & glows
    <section className="relative w-full overflow-hidden">

      {/* ── First screen: hero content ── */}
      <div className="relative z-10 flex items-center min-h-screen pl-[18vw] pr-[6vw] pt-28 pb-20">

        {/* Left col — text content */}
        <div className="flex flex-col justify-center flex-1">
          <h1
            className="text-white font-bold leading-[1.12] tracking-tight 
               lg:max-w-none max-w-[640px]"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            <span className="block lg:whitespace-nowrap">
              Where Brands Are Born,
            </span>
            <span className="block lg:whitespace-nowrap">
              Built, and Blown Up Online
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="mt-4 text-sm text-gray-400 font-light tracking-wide 
                lg:max-w-none max-w-md"
          >
            We design killer branding, build high-converting websites & apps,
            and create viral content that actually drives sales.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-row gap-3 items-center flex-wrap">
            <button className="h-10 px-5 border border-white bg-white text-black text-[0.62rem] font-bold tracking-[0.15em] uppercase transition-all duration-200 hover:bg-transparent hover:text-white rounded-[5px]">
              Book a free strategy call
            </button>

            <button className="h-10 px-5 border border-white/30 bg-transparent text-white text-[0.62rem] font-semibold tracking-[0.13em] uppercase transition-all duration-200 hover:border-white/60 hover:bg-white hover:text-black rounded-[5px]">
              See our work
            </button>
          </div>

          {/* Logo Ticker */}
          <div className="mt-14">
            <LogoTicker />
          </div>
        </div>

        {/* Right col — Reel Stack */}
        <div
          className="hidden lg:flex items-center justify-center flex-shrink-0"
          style={{ width: "34vw", minHeight: 420 }}
        >
          {/* <ReelStack /> */}
          <SpotlightCarousel/>
        </div>

      </div>

      <MarketingSolutions />

    </section>
  );
};

export default Hero;