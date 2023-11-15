"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {useRouter} from 'next/navigation'
import {useState} from 'react'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter()
  const [error, setError] = useState(null)
  const [respuestaDelServidor, setRespuestaDelServidor] = useState(null);
  
  const onSubmit = handleSubmit(async (data) => {
    const datos = {
      username: data.email,
      password: data.password,
    };
    console.log(datos);
    
    try {

      let headersList = {
      
        
        "Content-Type": "application/json"
       }
       console.log("SET_HEADER")
       let bodyContent = JSON.stringify({
         "username": "Nicolas",
         "password": "Nico"
       });
       console.log("SET_BODY")
       let response = await fetch("http://127.0.0.1:8000/login/", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       console.log("SET_RESPONSE")
       let key = await response.text();
       console.log(key);
       console.log("KEY_SET")

      // const respuesta = await fetch('http://127.0.0.1:8000//login/', {
      //   method: 'POST',
      //   headers: {
      //     "Accept": "*/*",
      //     "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(datos),
      // });

      // if (!respuesta.ok) {
      //   throw new Error(`Error en la solicitud: ${respuesta.status}`);
      // }

      const respuestaJson = await respuesta.json();
      setRespuestaDelServidor(respuestaJson);
      console.log('Respuesta DEL SERVIDOR', respuestaDelServidor)
    } catch (error) {
      console.error('Error al enviar la solicitud:', error.message);
    }

    router.refresh()
    // const res = await signIn("credentials", {
    //   email: data.email,
    //   password: data.password,
    //   redirect: false,
    // });

    //  console.log(res)
    // if (res.error) {
    //   setError(res.error)
    // } else {
    //   router.push('/dashboard')
    //   router.refresh()
    // }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">

        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
        )}

        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="text"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="user@email.com"
        />

        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="******"
        />

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginPage;