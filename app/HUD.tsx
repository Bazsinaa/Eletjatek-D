type Props = {
  jelenlegi: number;
  generacio: number;
  start: () => void;
  stop: () => void;
};

export default function HUD({
  jelenlegi,
  generacio,
  start,
  stop
}: Props) {
  return (
    <div className="flex flex-col gap-4">

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
          <p className="text-red-300">
            PIROS
          </p>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
          <p className="text-cyan-300">
            KÉK
          </p>
        </div>

      </div>

      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
        <p>
          Generáció:
          {" "}
          <span className="font-bold">
            {generacio}
          </span>
        </p>

        <p>
          Aktuális játékos:
          {" "}
          <span
            className={
              jelenlegi == 1
                ? "text-red-400"
                : "text-cyan-300"
            }
          >
            {jelenlegi == 1
              ? "PIROS"
              : "KÉK"}
          </span>
        </p>
      </div>

      <div className="flex gap-4">

        <button
          onClick={start}
          className="bg-cyan-500 hover:bg-cyan-400 transition px-4 py-3 rounded-xl"
        >
          Start
        </button>

        <button
          onClick={stop}
          className="bg-red-500 hover:bg-red-400 transition px-4 py-3 rounded-xl"
        >
          Stop
        </button>

      </div>

    </div>
  );
}