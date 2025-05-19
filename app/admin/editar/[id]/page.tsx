'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { db } from '@/app/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Produto } from '@/app/types/Produto'

export default function EditarProdutoPage() {
    const router = useRouter()
    const params = useParams()
    const id = params?.id as string

    const [produto, setProduto] = useState<Produto | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [images, setImages] = useState<FileList | null>(null)

    useEffect(() => {
        const carregarProduto = async () => {
            try {
                const docRef = doc(db, 'produtos', id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const dados = docSnap.data() as Produto
                    setProduto({ ...dados, id })
                } else {
                    alert('Produto não encontrado.')
                    router.push('/admin')
                }
            } catch (error) {
                console.error('Erro ao carregar produto:', error)
            }
            setLoading(false)
        }

        if (id) carregarProduto()
    }, [id, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!produto) return
        setSaving(true)

        try {
            // Extrair nomes dos arquivos selecionados
            let novosNomesDeImagens: string[] = []
            if (images && images.length > 0) {
                novosNomesDeImagens = Array.from(images).map((file) => file.name)
            }

            const docRef = doc(db, 'produtos', produto.id)
            await updateDoc(docRef, {
                name: produto.name,
                price: produto.price,
                description: produto.description,
                images: [...produto.images, ...novosNomesDeImagens],
            })

            alert('Produto atualizado com sucesso!')
            router.push('/admin')
        } catch (error) {
            console.error('Erro ao atualizar produto:', error)
            alert('Erro ao atualizar produto.')
        }

        setSaving(false)
    }

    const atualizarCampo = (campo: keyof Produto, valor: any) => {
        if (!produto) return
        setProduto({ ...produto, [campo]: valor })
    }

    if (loading) return <p className="p-4">Carregando produto...</p>
    if (!produto) return null

    return (
        <div className="max-w-xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    value={produto.name}
                    onChange={(e) => atualizarCampo('name', e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="number"
                    value={produto.price}
                    onChange={(e) => atualizarCampo('price', Number(e.target.value))}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    value={produto.description}
                    onChange={(e) => atualizarCampo('description', e.target.value)}
                    className="w-full border p-2 rounded"
                    rows={4}
                    required
                />

                {/* Lista de imagens atuais */}
                <div className="space-y-2">
                    <p className="font-semibold">Imagens:</p>
                    {produto.images.map((nome, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <img
                                src={`/images/produtos/${nome}`}
                                alt={`Imagem ${i}`}
                                className="w-20 h-20 object-cover border rounded"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    atualizarCampo('images', produto.images.filter((_, idx) => idx !== i))
                                }
                                className="text-red-600 hover:underline text-sm"
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                </div>

                {/* Seleção de novas imagens (somente salva o nome do arquivo) */}
                <input
                    type="file"
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                    className="w-full"
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </form>
        </div>
    )
}
