type Props = {
  jelenlegi: number;
  generacio: number;
  start: () => void;
  stop: () => void;
  piros: number;
  kek: number;
  ujJatek: () => void;
};

export default function HUD({
  jelenlegi,
  generacio,
  start,
  stop,
  piros,
  kek,
  ujJatek
}: Props) {
  return (
    <div className="flex flex-col gap-4">

      {/* stat kártyák */}
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
          <p className="text-red-300 text-sm">PIROS</p>
          <p className="text-3xl font-black text-red-400">
            {piros}
          </p>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
          <p className="text-cyan-300 text-sm">KÉK</p>
          <p className="text-3xl font-black text-cyan-300">
            {kek}
          </p>
        </div>

      </div>

      {/* generáció + játékos */}
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">

        <p>
          Generáció:{" "}
          <span className="font-bold text-green-300">
            {generacio}
          </span>
        </p>

        <p>
          Aktuális játékos:{" "}
          <span
            className={
              jelenlegi === 1
                ? "text-red-400 font-bold"
                : "text-cyan-300 font-bold"
            }
          >
            {jelenlegi === 1 ? "PIROS" : "KÉK"}
          </span>
        </p>

      </div>

      {/* gombok */}
      <div className="flex gap-2">

        <button
          onClick={start}
          className="flex-1 bg-cyan-500 hover:bg-cyan-400 transition px-4 py-3 rounded-xl font-bold"
        >
          Start
        </button>

        <button
          onClick={stop}
          className="flex-1 bg-red-500 hover:bg-red-400 transition px-4 py-3 rounded-xl font-bold"
        >
          Stop
        </button>

      </div>

      {/* 🔄 ÚJ JÁTÉK */}
      <button
        id="uj-jatek-gomb"
        onClick={ujJatek}
        className="w-full bg-green-500 hover:bg-green-400 transition px-4 py-3 rounded-xl font-black"
      >
        🔄 Új játék
      </button>

    </div>
  );
}