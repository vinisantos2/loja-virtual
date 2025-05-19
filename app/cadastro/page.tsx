"use client";
import React, { useState } from "react";
import { adicionarUsuario } from "../services/usuarioService"; // ajuste o caminho conforme seu projeto
import { useRouter } from "next/navigation";

const Cadastro = () => {
  const router = useRouter()
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState<number | "">("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (idade === "" || isNaN(Number(idade))) {
      setMensagem("Idade inválida");
      return;
    }

    try {
      await adicionarUsuario(
        {
          nome,
          email,
          idade: Number(idade),
        },
        senha
      );

      setMensagem("Usuário cadastrado com sucesso!");
      setNome("");
      setEmail("");
      setIdade("");
      setSenha("");
      router.push('/')
    } catch (error: any) {
      console.error(error);
      setMensagem(error.message || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>

        {mensagem && (
          <div className="mb-4 text-center text-sm text-green-600">{mensagem}</div>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Idade</label>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value === "" ? "" : Number(e.target.value))}
          required
          className="w-full p-2 mb-6 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="w-full p-2 mb-6 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
