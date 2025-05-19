import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Produto } from '../types/Produto';

const produtosRef = collection(db, 'produtos');

// CREATE
export const adicionarProduto = async (produto: Produto) => {
  const docRef = await addDoc(produtosRef, produto);
  return docRef.id;
};

// READ ALL
export const listarProdutos = async (): Promise<Produto[]> => {
  const snapshot = await getDocs(produtosRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Produto[];
};

// ✅ READ ONE (pelo ID)
export const buscarProdutoPorId = async (id: string): Promise<Produto | null> => {
  try {
    const produtoDoc = doc(db, 'produtos', id);
    const produtoSnap = await getDoc(produtoDoc);

    if (produtoSnap.exists()) {
      return { id, ...produtoSnap.data() } as Produto;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    return null;
  }
};

// UPDATE
export const atualizarProduto = async (id: string, produto: Partial<Produto>) => {
  const produtoDoc = doc(db, 'produtos', id);
  await updateDoc(produtoDoc, produto);
};

// DELETE
export const deletarProduto = async (id: string) => {
  const produtoDoc = doc(db, 'produtos', id);
  await deleteDoc(produtoDoc);
};
