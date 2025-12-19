"use client";

import Slideshow from "./components/wrapped/Slideshow";

export default function Home() {
  // Always show the Slideshow component
  // It handles auth states internally via WelcomeSlide
  return <Slideshow />;
}
