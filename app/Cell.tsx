"use client";

type Props = {
  value: number;
  onClick: () => void;
};

export default function Cell({
  value,
  onClick
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        aspect-square
        rounded-xl
        transition-all
        duration-300
        border
        border-white/10

        ${value == -1
          ? "bg-transparent opacity-0 pointer-events-none"
          : ""}

        ${value == 0
          ? "bg-white/5 hover:bg-white/10"
          : ""}

        ${value == 1
          ? "bg-red-500 shadow-[0_0_20px_rgba(255,0,0,0.8)]"
          : ""}

        ${value == 2
          ? "bg-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.8)]"
          : ""}
      `}
    />
  );
}