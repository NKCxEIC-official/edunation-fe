import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

export function signUp(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

export function addUser(payload) {
  const UserRef = doc(db, 'users', payload.uid);
  return setDoc(UserRef, payload);
}

export function login(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export function getUser(uid) {
  const UserRef = doc(db, 'users', uid);
  return getDoc(UserRef);
}

export function addUserAnonymous(payload) {
  const UserCollectionRef = collection(db, 'users');
  return addDoc(UserCollectionRef, payload);
}

export function updateAnonymousUserList(loggedInUID, payload) {
  const UserDocRef = doc(db, 'users', loggedInUID);
  return updateDoc(UserDocRef, payload);
}

export function getUserAnonymous(email) {
  const UserCollectionRef = collection(db, 'users');
  const q = query(UserCollectionRef, where('email', '==', email));
  return getDocs(q);
}

export function deleteDocument(docId) {
  const DocRef = doc(db, docId);
  return deleteDoc(DocRef);
}

export function saveTokenInLocalStorage(tokenDetails) {
  tokenDetails.expireDate = new Date(new Date().getTime() + tokenDetails.expiresIn * 1000);
  localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}
