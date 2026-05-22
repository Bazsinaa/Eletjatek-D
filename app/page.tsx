"use client";

import { useEffect, useState } from "react";

import Board from "./Board";
import HUD from "./HUD";
import Simulator from "./simulator";
const jatek = new Simulator(10, 10);

export default function HomePage() {
  const [matrix, setMatrix] =
    useState<number[][]>(jatek.matrix);

  const [generacio, setGeneracio] =
    useState<number>(0);

  const [fut, setFut] =
    useState<boolean>(false);

  function frissit() {
    setMatrix([...jatek.matrix]);
  }

  function kattintas(
    sor: number,
    oszlop: number
  ) {
    try {
      jatek.lerak(sor, oszlop);

      frissit();
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (!fut) return;

    const interval = setInterval(() => {
      jatek.run();

      setGeneracio((e) => e + 1);

      frissit();
    }, 500);

    return () =>
      clearInterval(interval);
  }, [fut]);

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative p-6">

      {/* háttér glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">

        <h1 className="text-5xl md:text-7xl font-black mb-10">
          <span className="text-red-400">
            Game
          </span>
          {" "}
          of
          {" "}
          <span className="text-cyan-300">
            Life
          </span>
        </h1>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">

          <HUD
            jelenlegi={
              jatek.jelenlegiJatekos
            }
            generacio={generacio}
            start={() => setFut(true)}
            stop={() => setFut(false)}
          />

          <div className="overflow-auto">
            <Board
              matrix={matrix}
              onCellClick={kattintas}
            />
          </div>

        </div>

      </div>

    </main>
  );
}