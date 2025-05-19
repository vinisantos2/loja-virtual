export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Minha Loja!</h1>
        <p className="text-lg mb-6">Encontre os melhores produtos com os melhores preços.</p>
        <a
          href="/produtos"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Ver Produtos
        </a>
      </section>
    </main>
  );
}
