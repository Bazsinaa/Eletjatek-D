"use client";

import Simulator from "@/app/simulator";
  const jatek: Simulator = new Simulator( 5, 5);

export default function HomePage() {

  return (
    <div>
      <p>{jatek}</p>
    </div>
  );
}
