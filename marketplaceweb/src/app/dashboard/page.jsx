"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthGuard from "../auth/authGuard/page";
import Restaurant from "@/app/restaurant/page";
import Supplier from "@/app/supplier/page";
import Link from "next/link";

function DashboardPage() {
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

  const renderContent = () => {
    switch (accountType) {
      case "Restaurante":
        return <Restaurant />;
      case "Proveedor":
        return <Supplier />;
      default:
        return "Pagina no encontrada";
    }
  };

  return (
    <AuthGuard>
      <nav className="">
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
    </AuthGuard>
  );
}

export default DashboardPage;
