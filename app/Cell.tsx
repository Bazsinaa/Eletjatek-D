"use client";

type Props = {
  value: number;
  onClick: () => void;
};

export default function Cell({ value, onClick }: Props) {
  return (
    <button
      className={`aspect-square rounded-2xl border border-white/10 transition-all duration-300 hover:scale-105 ${
        value == -1 ? "pointer-events-none bg-transparent opacity-0" : ""
      } ${value == 0 ? "bg-white/5 hover:bg-green-500/10" : ""} ${
        value == 1
          ? "bg-linear-to-br from-red-400 to-red-600 shadow-[0_0_25px_rgba(255,0,0,0.8)]"
          : ""
      } ${
        value == 2
          ? "bg-linear-to-br from-cyan-300 to-blue-500 shadow-[0_0_25px_rgba(0,255,255,0.8)]"
          : ""
      } `}
      onClick={onClick}
    />
  );
}
