// services/usuarioService.ts
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Usuario } from '../types/Usuario';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const usuariosRef = collection(db, 'usuarios');

// CREATE
// Cadastro no Auth e no Firestore
export const adicionarUsuario = async (usuario: Usuario, senha: string) => {
  // 1. Cria usuário no Firebase Auth
  const credenciais = await createUserWithEmailAndPassword(auth, usuario.email, senha);
  const uid = credenciais.user.uid;

  // 2. Salva dados adicionais no Firestore com o mesmo UID
  await setDoc(doc(db, 'usuarios', uid), {
    nome: usuario.nome,
    email: usuario.email,
    idade: usuario.idade,
  });
};

// READ
export const listarUsuarios = async (): Promise<Usuario[]> => {
  const snapshot = await getDocs(usuariosRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Usuario[];
};

// UPDATE
export const atualizarUsuario = async (id: string, usuario: Partial<Usuario>) => {
  const usuarioDoc = doc(db, 'usuarios', id);
  await updateDoc(usuarioDoc, usuario);
};

// DELETE
export const deletarUsuario = async (id: string) => {
  const usuarioDoc = doc(db, 'usuarios', id);
  await deleteDoc(usuarioDoc);
};
