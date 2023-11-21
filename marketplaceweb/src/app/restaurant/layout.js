export default function Layout({ children }) {
  return (
    <div className="min-h-screen min-w-full p-10 bg-orange-100 flex justify-center items-center">
      {children}
    </div>
  );
}
