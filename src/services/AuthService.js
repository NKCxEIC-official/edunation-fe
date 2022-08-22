import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
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

export function getUser(uid, callback) {
  const UserRef = doc(db, 'users', uid);
  return onSnapshot(UserRef, (doc) => callback(doc));
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

export function getDatafromDB(path, collectionType = false) {
  if (collectionType) {
    const collectionRef = collection(db, path);
    return getDocs(collectionRef);
  }
  const docRef = doc(db, path);
  return getDoc(docRef);
}

export function updateDatainDB(path, payload) {
  const docRef = doc(db, path);
  return updateDoc(docRef, payload);
}

export function checkIfDocumentExists(path) {
  const docRef = doc(db, path);
  return getDoc(docRef);
}

export function addDocument(path, payload) {
  const docRef = doc(db, path);
  return setDoc(docRef, payload);
}

export function updateRedSpotInProfile(payload) {
  const docRef = doc(db, `users/${payload.addedBy}`);
  return updateDoc(docRef, {
    redSpots: arrayUnion(payload),
  });
}

export function updateClassSubscriptionInClassroom(path, payload) {
  const docRef = doc(db, path);
  return updateDoc(docRef, {
    enrolled: arrayUnion(payload),
  });
}

export function updateClassSubscriptionInProfile(path, payload) {
  const docRef = doc(db, path);
  return updateDoc(docRef, {
    ongoingCourses: arrayUnion(payload),
  });
}
