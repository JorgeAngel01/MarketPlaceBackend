import Map from "@/componets/map";

export default function Page() {
  const latitude = 19.693720;
  const longitude = -101.182930;

  return (
    <div className="h-full w-full grid grid-cols-2 shadow-md rounded-sm text-black">
      <Column>
        <div className="text-4xl font-semibold">Nombre</div>
        <div className="text-xl text-justify">
          Exercitation ea occaecat incididunt reprehenderit consectetur eu
          excepteur excepteur magna. Aliquip enim mollit fugiat sunt minim.
          Laboris velit esse ut do mollit officia ullamco ullamco.
        </div>
        <div className="text-2xl font-semibold">Ubicacion</div>
        <Map latitude={latitude} longitude={longitude} />
      </Column>
      <Column>
        <div className="text-2xl pt-2 font-semibold">Productos</div>
        <div className="h-full w-full p-6 bg-white rounded-lg"></div>
      </Column>
    </div>
  );
}

function Column({ children }) {
  return (
    <div className="h-full w-full p-6 flex flex-col space-y-6">{children}</div>
  );
}
