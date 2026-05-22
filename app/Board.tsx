"use client";

import Cell from "./Cell";

type Props = {
  matrix: number[][];
  onCellClick: (
    sor: number,
    oszlop: number
  ) => void;
};

export default function Board({
  matrix,
  onCellClick
}: Props) {
  return (
    <div
      className="
        grid
        gap-2
        p-4
        rounded-3xl
        bg-white/5
        border
        border-white/10
        backdrop-blur-xl
      "
      style={{
        gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)`
      }}
    >
      {matrix.map((sor, sorIndex) =>
        sor.map((cella, oszlopIndex) => (
          <Cell
            key={`${sorIndex}-${oszlopIndex}`}
            value={cella}
            onClick={() =>
              onCellClick(
                sorIndex,
                oszlopIndex
              )
            }
          />
        ))
      )}
    </div>
  );
}