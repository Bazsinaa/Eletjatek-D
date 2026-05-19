"use client";

import Simulator from "@/app/simulator";
  const jatek: Simulator = new Simulator( 5, 5);

export default function HomePage() {

  //Dávid Dávid: megjeleníted üresen, utána kezdődik a lerakós fáris, ahol a játékosok lepakolják (lerak függvény - itt vannak kivételek, szóval try - catch blokkot használj kérlek) a sejteket. Eztán indul a szimuláció (run függvény) :3

  return (
    <div>
      <p>{jatek}</p>
    </div>
  );
}
