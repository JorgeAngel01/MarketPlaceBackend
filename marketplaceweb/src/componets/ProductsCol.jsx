import Producto from "./Producto";

export default function ProductCol({}) {
  return (
    <>
      <div className="text-2xl pt-2 font-semibold">Productos</div>
      <div className="h-full w-full p-6 bg-white rounded-lg space-y-4">
        <Producto />
      </div>
    </>
  );
}
