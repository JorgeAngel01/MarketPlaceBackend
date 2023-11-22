"use client";
import { useState } from "react";
import InfoCol from "@/componets/info/InfoCol";
import Column from "@/componets/Column";
import ProductCol from "@/componets/ProductsCol";
import AuthGuard from "../auth/authGuard/page";
import OneCol from "@/componets/OneCol";

export default function Page() {
  const token = localStorage.getItem("token");
  const propietarioName = localStorage.getItem("username");

  return (
    <AuthGuard>
      <div className="h-full w-full px-52 shadow-md rounded-sm text-black">
        <Column>
          <OneCol propietario={propietarioName} token={token} />
          {/* <InfoCol
            propietario= {propietarioName}
            token={token}
            onDataFetched={handleDataFetched}
            /> */}

          {/* {idProveedor ? (
            <ProductCol id={idProveedor} token={token} />
            ) : (
              <>
              <div className="text-2xl pt-2 font-semibold">Productos</div>
              <div className="h-full w-full p-6 bg-white rounded-lg space-y-4">
                Cargando...
              </div>
            </>
          )} */}
        </Column>
      </div>
    </AuthGuard>
  );
}
