"use client"
import React, { useState } from 'react';
import Link from 'next/link';

// Mock data type for cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Example mock cart items (replace with real data fetching)
const mockCart: CartItem[] = [
  {
    id: '1',
    name: 'Produto Exemplo 1',
    price: 99.9,
    quantity: 2,
    image: '/images/produto1.jpg',
  },
  {
    id: '2',
    name: 'Produto Exemplo 2',
    price: 49.5,
    quantity: 1,
    image: '/images/produto2.jpg',
  },
];

const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(mockCart);

  const updateQuantity = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl">Seu carrinho está vazio.</p>
          <Link href="/">
            <div className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Voltar à loja
            </div>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex bg-white rounded-lg p-4 shadow">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="mt-1">R$ {item.price.toFixed(2)}</p>

                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-600 hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 shadow h-fit">
            <h2 className="text-2xl font-semibold mb-4">Resumo do Pedido</h2>
            <div className="flex justify-between mb-2">
              <span>Total:</span>
              <span className="font-bold">R$ {total.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <div className="block text-center mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Finalizar Compra
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
