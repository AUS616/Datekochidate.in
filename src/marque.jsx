import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marque() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,      
        repeat: -1,
        duration: 25,        
        ease: "linear",
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="overflow-hidden bg-[#DCEBFE] py-1"
    >
      <div className="flex w-max marquee-track">
        
        {Array(20).fill(0).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3">
            <h1 className="text-xl md:text-xl pixelify ">
              Date spots
            </h1>
            <img className="h-8 md:h-8" src="/heart-removebg.png" alt="heart" />
          </div>
        ))}
      </div>
    </div>
  );
}
