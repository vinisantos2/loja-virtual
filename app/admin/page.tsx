'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Produto } from '@/app/types/Produto'
import { listarProdutos, deletarProduto } from '@/app/services/produtoService'

export default function AdminPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [deletandoId, setDeletandoId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await listarProdutos()
        setProdutos(dados)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmar = confirm('Tem certeza que deseja deletar este produto?')
    if (!confirmar) return

    setDeletandoId(id)
    try {
      await deletarProduto(id)
      setProdutos((prev) => prev.filter((p) => p.id !== id))
      alert('Produto deletado com sucesso!')
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
      alert('Erro ao deletar produto.')
    }
    setDeletandoId(null)
  }

  if (loading) return <p className="p-4">Carregando produtos...</p>

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Administração de Produtos</h1>
      <Link href="/admin/novo-produto" className="mb-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        + Novo Produto
      </Link>

      <div className="space-y-4 mt-4">
        {produtos.map((produto) => (
          <div key={produto.id} className="flex items-center justify-between bg-white shadow p-4 rounded">
            <div>
              <p className="font-semibold">{produto.name}</p>
              <p className="text-sm text-gray-600">R$ {produto.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/editar/${produto.id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(produto.id)}
                disabled={deletandoId === produto.id}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                {deletandoId === produto.id ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
