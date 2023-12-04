'use client'
import AuthGuard from "../auth/authGuard/page";

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <div className="w-full h-full p-10 bg-orange-100 flex justify-center items-center">
        {children}
      </div>
    </AuthGuard>
  );
}
