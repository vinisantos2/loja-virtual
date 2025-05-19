// ProdutoDetalhe.tsx (Server Component)
import { notFound } from "next/navigation";
import Image from "next/image";
import { buscarProdutoPorId } from "@/app/services/produtoService";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProdutoDetalhe({ params }: Props) {
  console.log(params.id)
  const produto = await buscarProdutoPorId(params.id);

  if (!produto) {
    notFound();
  }

  const primeiraImagem = produto.images?.[0] ?? "";

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 relative w-full h-64 md:h-96">
          {primeiraImagem && (
            <Image
              src={`/images/produtos/${encodeURIComponent(primeiraImagem)}`}
              alt={produto.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded"
              priority
            />
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{produto.name}</h1>
            <p className="text-green-600 text-3xl font-extrabold mb-6">
              R$ {produto.price.toFixed(2)}
            </p>
            <p className="text-gray-700 leading-relaxed">{produto.description}</p>
          </div>

          {/* <AdicionarAoCarrinho produtoId={produto.id} /> */}
        </div>
      </div>
    </div>
  );
}
