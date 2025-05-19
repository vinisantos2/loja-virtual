'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'

export default function NovoProdutoPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<FileList | null>(null)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const imageIds: string[] = []

      if (images && images.length > 0) {
        // Só salva o nome/id das imagens (simulando que elas já estão em /public/images/produtos/)
        for (const file of Array.from(images)) {
          // Você pode gerar um id único aqui, por exemplo:
          const id = `${Date.now()}_${file.name}`
          imageIds.push(id)

          // Importante: você terá que copiar manualmente a imagem para /public/images/produtos/ com o mesmo nome/id
        }
      }

      await addDoc(collection(db, 'produtos'), {
        name,
        price: Number(price),
        description,
        images: imageIds,
      })

      alert('Produto adicionado com sucesso!')
      router.push('/admin')
    } catch (error) {
      console.error('Erro ao adicionar produto:', error)
      alert('Erro ao adicionar produto.')
    }

    setSaving(false)
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="w-full"
          accept="image/*"
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? 'Salvando...' : 'Salvar Produto'}
        </button>
      </form>
    </div>
  )
}
