"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Restaurant from "@/app/restaurant/page";
import Supplier from "@/app/supplier/page";
import AuthGuard from "./auth/authGuard/page";

export default function Home() {
  const [accountType, setAccountType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Safely read from localStorage
    try {
      const storedAccountType = localStorage.getItem("accountType");
      setAccountType(storedAccountType);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  const handleLogout = () => {
    // Limpiar la variable en localStorage y redirigir al usuario a la página de inicio de sesión
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("accountType");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
    router.push("/auth/login");
  };

  const renderContent = () =>
    accountType === "Restaurante" ? (
      <Restaurant />
    ) : accountType === "Proveedor" ? (
      <Supplier />
    ) : (
      "Pagina no encontrada"
    );

  return (
    <NextUIProvider className="h-full sm:p-4 md:p-10 lg:px-20 xl:px-44">
      <AuthGuard>
        <main className="h-full flex flex-col items-center justify-between p-10">
          <nav className="bg-black p-2 w-full">
            <div className="container mx-auto flex justify-between items-center">
              <p className="text-white text-2xl font-bold">{accountType}</p>
              <button
                className="bg-white text-black px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </nav>
          {renderContent()}
        </main>
      </AuthGuard>
    </NextUIProvider>
  );
}
