//LOGIN
"use client";
import { useForm } from "react-hook-form";
//import { signIn } from "next-auth/react";
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
    const datos = JSON.stringify({
      username: data.username,
      password: data.password
    })

    console.log(datos);
    
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({ username: data.email, password: data.password}),
        body: datos,
      });
      const keyGenerated = await response.json();
      console.log(keyGenerated);
      if(keyGenerated.hasOwnProperty('token')){
        localStorage.setItem('token', keyGenerated.token)
        localStorage.setItem('username', data.username)
        router.push('/dashboard')
      }else{
        setError(keyGenerated)
      }

    } catch (error) {
      console.error("Error fetching data: ", error);
    }

    router.refresh()
  }
);

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">

        {/* {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
        )} */}
        {error && error.non_field_errors && error.non_field_errors.length > 0 && (
          <div>
            {error.non_field_errors.map((errorMessage, index) => (
              <p key={index} className="bg-red-500 text-lg text-white p-3 rounded mb-2">
                {errorMessage}
              </p>
            ))}
          </div>
        )}


        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Username:
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="yourUser123"
        />

        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
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