import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="w-full flex justify-between items-center px-6 py-4 shadow-sm">
        <div>
          <Image
            aria-hidden
            src="/alume.svg"
            alt="Alume logo"
            width={100}
            height={38}
          />
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Do estudante ao médico
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          Soluções financeiras para cada fase da sua jornada.
        </p>
        <Link
          href="/login"
          className="mt-6 px-6 py-3 bg-[#00dcc0] text-white rounded-full shadow hover:opacity-90 transition"
        >
          Comece agora
        </Link>
      </main>
    </div>
  );
}
