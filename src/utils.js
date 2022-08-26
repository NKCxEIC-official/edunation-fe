// import { getDatabase, ref, onValue } from 'firebase/database';

// const observeLiveClass = () => {
//   const db = getDatabase();
//   const documentId = `liveClass/classId/`;
//   const documentRef = ref(db, documentId);

//   return onValue(
//     documentRef,
//     (snapshot) => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const isLive = data?.isLive;
//         console.log('🚀 ~ file: utils.js ~ line 14 ~ observeLiveClass ~ isLive', isLive);
//         return isLive;
//       }
//     },
//   );
// };

// export { observeLiveClass };
