"use client";

import { useEffect, useState } from "react";
import Board from "./Board";
import HUD from "./HUD";
import Simulator from "./simulator";

const jatek = new Simulator(10, 10);

export default function HomePage() {
  const [matrix, setMatrix] = useState<number[][]>(jatek.matrix);
  const [generacio, setGeneracio] = useState<number>(0);
  const [fut, setFut] = useState<boolean>(false);
  const [gyoztes, setGyoztes] = useState<string | null>(null);
  const [kihalas, setKihalas] = useState(false);

  function frissit() {
    setMatrix([...jatek.matrix]);
  }

  function statok() {
    let piros = 0;
    let kek = 0;

    for (const sor of jatek.matrix) {
      for (const cella of sor) {
        if (cella === 1) piros++;
        if (cella === 2) kek++;
      }
    }

    return { piros, kek };
  }

  function kattintas(sor: number, oszlop: number) {
    try {
      jatek.lerak(sor, oszlop); // <- nálad: lerak helyett place
      frissit();
    } catch (err) {
      alert(err);
    }
  }

  function ujJatek() {
    jatek.reset();

    setFut(false);
    setGyoztes(null);
    setKihalas(false);
    setGeneracio(0);

    setMatrix([...jatek.matrix]);
  }

  useEffect(() => {
    if (!fut) return;

    const interval = setInterval(() => {
      jatek.run(); // <- run helyett step

      setGeneracio((e) => e + 1);
      frissit();

      const { piros, kek } = statok();

      // 🟥🟦 győzelem
      if (piros === 0 && kek > 0) {
        setGyoztes("KÉK");
        setFut(false);
        return;
      }

      if (kek === 0 && piros > 0) {
        setGyoztes("PIROS");
        setFut(false);
        return;
      }

      // 💀 kihalás
      if (piros === 0 && kek === 0) {
        setKihalas(true);
        setFut(false);
        return;
      }
    }, 500);

    return () => clearInterval(interval);
  }, [fut]);

  const { piros, kek } = statok();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#041b11] via-[#06281a] to-[#02150d] p-6 text-white">
      {/* glow */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-green-400/20 blur-[140px]" />
      <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-lime-400/20 blur-[140px]" />

      {/* 🏆 győzelem popup */}
      {gyoztes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="rounded-[40px] border border-green-400/30 bg-[#0b2d1f] p-12 text-center shadow-[0_0_80px_rgba(0,255,120,0.3)]">
            <h1 className="mb-6 text-6xl">🎉🎉🎉</h1>

            <h2 className="mb-4 text-5xl font-black">Nyert a</h2>

            <h3
              className={`mb-6 text-7xl font-black ${
                gyoztes === "PIROS" ? "text-red-400" : "text-cyan-300"
              }`}
            >
              {gyoztes}
            </h3>

            <p className="mb-8 text-2xl text-green-200">🥳 Dominálta a sejtvilágot 🥳</p>

            <button
              className="rounded-2xl bg-green-500 px-8 py-4 text-lg font-black shadow-[0_0_25px_rgba(0,255,120,0.4)] transition hover:bg-green-400"
              onClick={ujJatek}
            >
              🔄 Új játék
            </button>
          </div>
        </div>
      )}

      {/* 💀 kihalás popup */}
      {kihalas && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="rounded-[40px] border border-gray-500/30 bg-[#111] p-12 text-center shadow-[0_0_80px_rgba(255,255,255,0.1)]">
            <h1 className="mb-6 text-6xl">💀</h1>

            <h2 className="mb-4 text-5xl font-black text-gray-300">Kihalt az élet</h2>

            <p className="mb-8 text-xl text-gray-400">
              Nincs több sejt a pályán… a világ csendbe borult.
            </p>

            <button
              className="rounded-2xl bg-green-500 px-8 py-4 text-lg font-black transition hover:bg-green-400"
              onClick={ujJatek}
            >
              🔄 Új világ
            </button>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <h1 className="mb-10 text-6xl font-black text-green-200">🌱 Life Arena</h1>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <HUD
            generacio={generacio}
            jelenlegi={jatek.jelenlegiJatekos}
            kek={kek}
            piros={piros}
            start={() => setFut(true)}
            stop={() => setFut(false)}
            ujJatek={ujJatek}
          />

          <div className="overflow-auto">
            <Board matrix={matrix} onCellClick={kattintas} />
          </div>
        </div>
      </div>
    </main>
  );
}
