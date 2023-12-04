"use client";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {useState, useEffect} from 'react';
import Link from 'next/link';
import Switch from 'react-switch'
import ProveedorForm from "@/componets/register/ProveedorForm";
import RestauranteForm from "@/componets/register/RestauranteForm";


function RegisterPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null)
  const [typeUser, setTypeUser] = useState(true)
  
  const createProveedor = async ({data, userRegister}) =>{
    try {
      const response = await fetch("/api/register/proveedor",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propietario: userRegister.id,
          nombre: data.brandName,
          descripcion: data.description,
        })
      })
      const res = await response.json()
      if(res.hasOwnProperty('id')){
        localStorage.setItem('token', userRegister.token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('accountType', "Proveedor")
        router.push('/')
      }else{
        //Aqui se va a borrar el usuario recien ingresado, pero no se como aun
        console.log("Aqui fue donde todo valio madres")
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const createRestaurante = async ({data, userRegister}) =>{
    try {
      const response = await fetch("/api/register/restaurante",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propietario: userRegister.id,
          nombre: data.brandName,
          descripcion: data.description,
          latitud: data.latitude,
          longitud: data.longitude,
        })
      })
      const res = await response.json()
      if(res.hasOwnProperty('id')){
        localStorage.setItem('token', userRegister.token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('accountType', "Restaurante")
        
      }else{
        //Aqui se va a borrar el usuario recien ingresado, pero no se como aun
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    setError(null)
    if (data.password !== data.confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
    const res = await fetch("/api/register/usuario", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const userRegister = await res.json()
    console.log('UserRegister', userRegister)
    if(userRegister.hasOwnProperty('token')){
      typeUser === false ? await createRestaurante({data, userRegister}) :
      await createProveedor({data, userRegister})
      router.push('/')
    }else{
      //Colocar los mensajes de error segun la respuesta del SERVER
      //return setError("No se pudo generar el usuario, intente con otro nombre de usuario")
      userRegister.hasOwnProperty('email') && userRegister.hasOwnProperty('username') ? setError("A user with that email and username already exists") :
      userRegister.hasOwnProperty('email') ? setError(userRegister.email) :
      userRegister.hasOwnProperty('username') ? setError(userRegister.username) : null
    }

    } catch (error) {
      
    }
  });

  const validatePassword = (value) => {
    // Al menos dos letras mayúsculas
    const uppercaseLetters = value.match(/[A-Z]/g);
    if (!uppercaseLetters || uppercaseLetters.length < 2) {
      return "Debe contener al menos dos letras mayúsculas";
    }

    // Al menos dos letras minúsculas
    const lowercaseLetters = value.match(/[a-z]/g);
    if (!lowercaseLetters || lowercaseLetters.length < 2) {
      return "Debe contener al menos dos letras minúsculas";
    }

    // Al menos tres números no consecutivos
    const nonConsecutiveNumbers = value.match(/^(?!.*(\d)\1{2,})(?=.*\d.*)/g);
    if (!nonConsecutiveNumbers || nonConsecutiveNumbers.length < 3) {
      return "Debe contener al menos tres números no consecutivos";
    }

    // Al menos dos caracteres especiales
    const specialCharacters = value.match(/[!@#$%^&*(),.?":{}|<>]/g);
    if (!specialCharacters || specialCharacters.length < 2) {
      return "Debe contener al menos dos caracteres especiales";
    }

    // Longitud mínima de 10 caracteres
    if (value.length < 10) {
      return "Debe tener al menos 10 caracteres";
    }

    return true; // La contraseña cumple con todas las reglas
  };

  console.log(errors);

  return (
    <div className="flex justify-center items-center flex-col">
        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
      )}
      
      <form onSubmit={onSubmit} className="w-2/5">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>

        <div className="flex">
        <div className="w-1/2">
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

        <label htmlFor="first_name" className="text-slate-500 mb-2 block text-sm">
          First Name:
        </label>
        <input
          type="text"
          {...register("first_name", {
            required: {
              value: true,
              message: "First Name is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Your First Name"
        />

        {errors.first_name && (
          <span className="text-red-500 text-xs">
            {errors.first_name.message}
          </span>
        )}

        <label htmlFor="last_name" className="text-slate-500 mb-2 block text-sm">
          Last Name:
        </label>
        <input
          type="text"
          {...register("last_name", {
            required: {
              value: true,
              message: "Last Name is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Your Last Name"
        />

        {errors.last_name && (
          <span className="text-red-500 text-xs">
            {errors.last_name.message}
          </span>
        )}

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
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
            // validate: validatePassword,
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="********"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="********"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
       </div>
      <div className="w-1/2 ml-5">
        <label className="text-slate-500 mb-2 block text-sm">
          Account Type:
        </label>
        <div className="flex items-center mb-2">
            <span className="mr-2 text-slate-500">Restaurante</span>
            <Controller
              name="accountType"
              control={control}
              defaultValue={true} // Puedes ajustar esto según tu lógica predeterminada
              render={({ field: { onChange, value } }) =>{
                setTypeUser(value)

                return(
                  <Switch
                    onChange={(checked) => onChange(checked)}
                    checked={value}
                    onColor="#86d3ff"
                    offColor="#dcdcdc"
                    width={50}
                    height={24}
                    handleDiameter={20}
                  />
                )
              }}
            />
              <span className="ml-2 text-slate-500">Proveedor</span>
            </div>
            <br />
          <ProveedorForm register={register} errors={errors}/>
          
          {typeUser === false ? <RestauranteForm register={register} errors={errors}/> : null}
      </div>
      </div>

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Register
        </button>

        <div className="text-slate-500 mt-4">
          Do you have an account?{' '}
          <Link href="/auth/login">
            <p className="text-blue-500">Log in</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default RegisterPage;