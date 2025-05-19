"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../lib/firebase"; // ajuste se o caminho for diferente

const AuthOptions = () => {
  const [usuario, setUsuario] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsubscribe(); // limpa o listener ao desmontar o componente
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUsuario(null); // limpa o estado
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <div className="absolute top-4 right-4 flex items-center gap-4">
      {!usuario ? (
        <>
          <Link href="/login">
            <span className="cursor-pointer text-blue-600 hover:underline">Login</span>
          </Link>
          <Link href="/cadastro">
            <span className="cursor-pointer text-blue-600 hover:underline">Cadastro</span>
          </Link>
        </>
      ) : (
        <>
          <span className="text-gray-700">Olá, {usuario.displayName || usuario.email}</span>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline cursor-pointer"
          >
            Sair
          </button>
        </>
      )}
    </div>
  );
};

export default AuthOptions;
