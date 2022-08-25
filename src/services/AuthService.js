import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  increment,
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

// export function getDatafromDB(path, collectionType = false) {
//   if (collectionType) {
//     const collectionRef = collection(db, path);
//     return getDocs(collectionRef);
//   }
//   const docRef = doc(db, path);
//   return getDoc(docRef);
// }

export function getDatafromDB(path, callback, collectionType = false) {
  if (collectionType) {
    const collectionRef = collection(db, path);
    return onSnapshot(collectionRef, (doc) => callback(doc));
  }
  const docRef = doc(db, path);
  return onSnapshot(docRef, (doc) => callback(doc));
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

export function addDocumentInDb(payload, collectionName) {
  const UserCollectionRef = collection(db, collectionName);
  console.log("suarer backa")
  return addDoc(UserCollectionRef, payload);
}

export function getTeachingClasses(uid) {
  const UserCollectionRef = collection(db, 'classes');
  const q = query(UserCollectionRef, where('creator.uid', '==', uid));
  return getDocs(q);
}

export function communityUpvote(postId, uid, downvotedBy) {
  const communityDocRef = doc(db, 'community', postId);
  if (downvotedBy.includes(uid)) {
    return updateDoc(communityDocRef, {
      upvote: increment(1),
      upvotedBy: arrayUnion(uid),
      downvotedBy: arrayRemove(uid),
      downvote: increment(-1),
    });
  }

  return updateDoc(communityDocRef, {
    upvote: increment(1),
    upvotedBy: arrayUnion(uid),
  });
}

export function communityDownvote(postId, uid, upvotedBy) {
  const communityDocRef = doc(db, 'community', postId);
  if (upvotedBy.includes(uid)) {
    return updateDoc(communityDocRef, {
      upvote: increment(-1),
      upvotedBy: arrayRemove(uid),
      downvotedBy: arrayUnion(uid),
      downvote: increment(1),
    });
  }

  return updateDoc(communityDocRef, {
    downvote: increment(1),
    downvotedBy: arrayUnion(uid),
  });
}

export function postCommunityAnswer(postId, payload) {
  const communityDocRef = doc(db, 'community', postId);
  return updateDoc(communityDocRef, {
    answers: arrayUnion(payload),
  });
}

export function getClassEvents(classId) {
  const UserCollectionRef = collection(db, 'events');
  const q = query(UserCollectionRef, where('class.classId', '==', classId));
  return getDocs(q);
 }
 
 export function getEventsForTeacher(uid) {
  const eventList = [];
  
  getTeachingClasses(uid).then((querySnapshot) => {
  querySnapshot.docs.forEach((doc, idx) => {
  const course = doc.data();
 
  getClassEvents(doc.id).then((queryEventSnapshot) => {
  
  queryEventSnapshot.docs.forEach((dock, idx) => {
  eventList.push({
  ...dock.data(),
  startDate: new Date(dock.data().startDate.seconds * 1000),
  endDate: new Date(dock.data().endDate.seconds * 1000),
  });
 
  if(idx === queryEventSnapshot.docs.length -1)
  {
  console.log("yoyo",eventList)
  return eventList;
  }
  
  });
  });
  });
  });
 
  return []
  
 }
 
 