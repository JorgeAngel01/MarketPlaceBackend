export default function Column({ children }) {
  return (
    <div className="h-full w-full break-after-all p-10 flex flex-col space-y-6 overflow-hidden">
      {children}
    </div>
  );
}
