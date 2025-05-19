"use client"
import React, { useState } from "react";
import { loginWithEmail, loginWithGoogle } from "../lib/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);

  const camposValidos = () => {
    if (!email.includes('@') || !email.includes('.')) {
      toast.error('Digite um e-mail válido.');
      return false;
    }

    if (senha.length < 5) {
      toast.error('Senha deve ter pelo menos 5 caracteres.');
      return false;
    }

    return true;
  };



  const handleLogin = async () => {

    if (!camposValidos()) return;

    setLoading(true);
    try {
      await loginWithEmail(email, senha);
      toast.success('Login realizado com sucesso!');
    } catch (e) {
      setLoading(false);
      if (e instanceof Error && 'code' in e) {
        switch ((e as any).code) {
          case 'auth/invalid-email':
            toast.error('Email inválido');
            break;
          case 'auth/user-not-found':
            toast.error('Usuário não encontrado');
            break;
          case 'auth/wrong-password':
            toast.error('Senha incorreta');
            break;
          case 'auth/too-many-requests':
            toast.error('Muitas tentativas. Tente novamente mais tarde.');
            break;
          default:
            toast.error('Erro ao fazer login. Verifique suas credenciais.');
            console.error(e);
        }
      } else {
        toast.error('Erro desconhecido ao fazer login.');
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Login com Google realizado com sucesso!');
    } catch (e) {
      setLoading(false);
      toast.error('Erro no login com Google');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode verificar os dados com a API
    console.log({ email, senha });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
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
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
