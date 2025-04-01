import React from "react";
import logo from "./../../assets/images/3ventis.png";


export default function VentisLogo({clr="black"}) {
  return (
    <div className="flex items-center gap-[1.2rem]">
      <img src={logo.src} alt="3ventis logo" className="size-16" />
      <span style={{color:clr, fontFamily:"General Sans"}} className="text-[2rem] font-semibold tracking-[-0.04em]">3ventiz</span>
    </div>
  );
}
