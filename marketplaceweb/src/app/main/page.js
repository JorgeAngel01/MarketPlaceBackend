import InfoCol from "@/componets/InfoCol";
import Column from "@/componets/Column";

export default function Page() {
  const token = "e5e0eeb6f8a0d67b303bd3cb067c31d872280e5b";
  // const token = "99a5cb763472faa3c2ccf8158731ca2e5e085b01";

  return (
    <div className="h-full w-full grid grid-cols-2 shadow-md rounded-sm text-black">
      <Column>
        <InfoCol propietario="sofia" token={token} tipo="restaurante" />
      </Column>
      <Column>
        <div className="text-2xl pt-2 font-semibold">Productos</div>
        <div className="h-full w-full p-6 bg-white rounded-lg">

        </div>
      </Column>
    </div>
  );
}

function Producto({ producto }) {
  return (
    <div className="h-full w-full p-6 flex flex-col space-y-6"></div>
  );
}
