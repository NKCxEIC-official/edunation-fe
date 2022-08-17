import { auth, db } from "../../utils/firebaseConfig";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import {
  loginUserFailure,
  loginUserInit,
  loginUserSuccess,
  registerUserInit,
  registerUserSuccess,
} from "./actions";

/**
 * Registers new user.
 * @param {String} email Email Address of the user
 * @param {String} password Password of the user
 * @param {Function} dispatch Dispatcher function for redux state
 *
 * @returns {Promise} Returns a promise object containing the message
 */
export const loginUser = (email, password, dispatch) => {
  return new Promise((resolve, reject) => {
    if (!email) reject({ message: "Please enter email address to login." });
    if (!password) reject({ message: "Please enter password to login." });

    // User login process start
    dispatch(loginUserInit());
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const userObj = {
          uid: userCredentials.user.uid,
          name: userCredentials.user.displayName,
          avatar: userCredentials.user.photoURL,
          email: userCredentials.user.email,
        };

        const docRef = doc(db, "users", userCredentials.user.uid);
        getDoc(docRef).then((docData) => {
          if (docData.exists()) {
            const userData = docData.data();
            userObj.role = userData.role;
            dispatch(loginUserSuccess(userObj));
            resolve({ message: "Success, logging you in." });
          } else {
            reject({ message: "User doesn't exist. Try to register." });
          }
        });
      })
      .catch((error) => {
        dispatch(loginUserFailure());
        let errorMessage = getAuthErrorMessage(error?.code);
        reject({ message: errorMessage });
      });
  });
};

/**
 * Registers new user.
 * @param {String} email Email Address of the new user
 * @param {String} password Password of the new user
 * @param {Object} userData User Data of the new user, expects fields name: String, displayPictureURL: String, role: Array fields
 * @param {Function} dispatch Dispatcher function for redux state
 *
 * @returns {Promise} Returns a promise object containing the message
 */
export const registerUser = (email, password, userData, dispatch) => {
  return new Promise((resolve, reject) => {
    if (!email) reject({ message: "Please enter email address to register." });
    if (!password) reject({ message: "Please enter password to register." });
    if (!userData) reject({ message: "Please complete all the required fields to register" });

    // User registration start
    dispatch(registerUserInit());
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        updateProfile(userCredentials.user, {
          displayName: userData.name,
          photoURL: userData.displayPictureURL,
        })
          .then(() => {
            const docRef = doc(db, "users", userCredentials.user.uid);
            setDoc(docRef, {
              role: arrayUnion(...userData.role),
            })
              .then(() => {
                const userObj = {
                  uid: userCredentials.user.uid,
                  name: userData.name,
                  avatar: userData.displayPictureURL,
                  email: email,
                  role: userData.role,
                };
                dispatch(registerUserSuccess(userObj));
                resolve({ message: "User registration successful." });
              })
              .catch((error) => {
                deleteUser(userCredentials.user);
                const errorMessage = getAuthErrorMessage(error.code);
                reject({ message: errorMessage });
              });
          })
          .catch((error) => {
            deleteUser(userCredentials.user);
            const errorMessage = getAuthErrorMessage(error.code);
            reject({ message: errorMessage });
          });
      })
      .catch((error) => {
        const errorMessage = getAuthErrorMessage(error.code);
        reject({ message: errorMessage });
      });
  });
};

const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "User not registered, can't login.";
    case "auth/wrong-password":
      return "Incorrect password, try again.";
    case "auth/email-already-in-use":
      return "Email already registered, try to login.";
    default:
      return "Something went wrong. Please try again.";
  }
};
