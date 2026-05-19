"use client";

import { useEffect, useState } from "react";
import Simulator from "@/app/simulator";

export default function HomePage() {
  const [jatek] = useState(new Simulator(10, 10));
  const [, ujrarender] = useState(0);

  function kattintas(sor: number, oszlop: number) {
    try {
      jatek.lerak(sor, oszlop);
      ujrarender(prev => prev + 1);
    }
    
    catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (jatek.jatekElindult) ujrarender(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [jatek]);

  return (
    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>Conway Életjáték</h1>
      <p>Piros lerakva: {jatek.pirosLerakott}/5</p>
      <p>Kék lerakva: {jatek.kekLerakott}/5</p>

      {
        jatek.jatekElindult &&
        <h2>A játék elindult!</h2>
}
      <p>
        Jelenlegi játékos:
        {
          jatek.jelenlegiJatekos == 1
            ? " PIROS"
            : " KÉK"
        }
      </p>

      {/* Tábla */}
      {
        jatek.matrix.map((sor, sorIndex) => (

          <div
            key={sorIndex}
            style={{
              display: "flex"
            }}
          >

            {
              sor.map((cella, oszlopIndex) => {

                let szin = "white";

                // Fal
                if (cella == -1) {
                  szin = "black";
                }

                // Piros játékos
                if (cella == 1) {
                  szin = "red";
                }

                // Kék játékos
                if (cella == 2) {
                  szin = "blue";
                }

                return (
                  <div key={oszlopIndex} onClick={() => kattintas(sorIndex, oszlopIndex)}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid gray",
                      backgroundColor: szin,
                      cursor: "pointer"
                    }}
                  />
                );

              })
            }

          </div>

        ))
      }

    </div>
  );
}