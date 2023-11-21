"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import AuthGuard from '../auth/authGuard/page';
import Restaurant from "@/app/restaurant/page"
import Proveedor from "@/app/proveedor/page"
import Link from 'next/link';

function DashboardPage() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const accountType = localStorage.getItem('accountType')
  console.log(accountType)
  const handleLogout = () => {
    // Limpiar la variable en localStorage y redirigir al usuario a la página de inicio de sesión
    localStorage.removeItem('token'); 
    localStorage.removeItem('username')
    localStorage.removeItem('accountType')
    router.push("/auth/login");
  };

  return (
    <AuthGuard>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          
            <p className="text-white text-2xl font-bold">
              {accountType}
              </p>
          
          <button
            className="bg-white text-black px-4 py-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {accountType === "Restaurante" ? <Restaurant/> : 
      accountType === "Proveedor" ? 'Aqui va el proveedor' : 
      'Pagina no encontrada'
      }
    </AuthGuard>
  );
}

export default DashboardPage;
