// components/AuthGuard.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Verificar si la variable está presente en localStorage al cargar el componente
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username")
    console.log(token)
    if (!token || !username) {
      router.push("/auth/login");
    }else{
      try{
        // router.push("/restaurant")
        router.push("/dashboard")
      }catch(error){
        console.error("Error fetching data: ", error);
      }
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
