"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Produto } from "../types/Produto";
import { listarProdutos } from "../services/produtoService";

export default function ProductsPage() {
  const [products, setProducts] = useState<Produto[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const dados = await listarProdutos();
        setProducts(dados);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <Link href={`/produtos/${product.id}`}>
              <div>
                {product.images?.length > 0 && (
                  <img
                    src={`/images/produtos/${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <h2 className="mt-4 font-semibold text-lg">{product.name}</h2>
                <p className="mt-1 text-green-600 font-bold">
                  R$ {product.price.toFixed(2)}
                </p>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
              </div>
            </Link>
            <Link href="/carrinho">
              <div className="mt-4 block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Adicionar ao Carrinho
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
