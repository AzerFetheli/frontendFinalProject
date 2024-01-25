import React from "react";
import "./home.css";
import SectionOne from "./components/Section one/SectionOne";
import SectionTwo from "./components/SectionTwo/SectionTwo";
import SectionFive from "./components/SectionFive/SectionFive";
import SectionSeven from "./components/SectionSeven/SectionSeven";
import SectionNine from "./components/SectionNine/SectionNine";
import SectionEnd from "./components/SectionEnd/SectionEnd";
import SectionThree from "./components/SectionThree/SectionThree";
import SwiperTwo from "./components/swiperTwo/SwiperTwo";

export default function Home() {
  return (
    <>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFive />
      <SectionSeven />
      <SectionNine />
      <SectionEnd />
    </>
  );
}
