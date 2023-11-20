"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import AuthGuard from '../auth/authGuard/page';

function DashboardPage() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  
  const handleLogout = () => {
    // Limpiar la variable en localStorage y redirigir al usuario a la página de inicio de sesión
    localStorage.removeItem('token'); // Reemplaza 'miToken' con el nombre de tu variable
    localStorage.removeItem('username')
    router.push("/auth/login");
  };

  return (
    <AuthGuard>
      <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <div>
          <h1 className="text-white text-5xl">Dashboard</h1>
          <button
            className="bg-white text-black px-4 py-2 rounded-md mt-4"
            onClick={handleLogout}
            >
            Logout
          </button>
        </div>
      </section>
    </AuthGuard>
  );
}

export default DashboardPage;
