import {
  addUser,
  addUserAnonymous,
  deleteDocument,
  getDatafromDB,
  getUser,
  getUserAnonymous,
  login,
  signUp,
  updateAnonymousUserList,
  updateDatainDB,
} from '../../services/AuthService';
import {
  GET_DATA_ACTION,
  HIDE_MODAL_ACTION,
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
} from '../constants';

export function signupAction({ email, password, firstName, lastName, userData }) {
  return (dispatch) => {
    console.log(userData);
    signUp(email, password)
      .then(({ user }) => {
        // Signed in

        let payload = {};
        if (userData) {
          if (!('firstName' in userData)) {
            payload = {
              firstName,
              lastName,
              uid: user.uid,
              role: 1,
              about: '',
              address: '',
              age: '',
              city: '',
              classes: [],
              courseInProgressStudent: 0,
              courseInProgressTeacher: 0,
              coursesOffered: [],
              dob: '',
              dp: '',
              email,
              isTeacher: false,
              occupation: '',
              pendingQA: 0,
              phone: '',
              school: '',
              specialisation: '',
              state: '',
              totalEnrolled: 0,
              university: '',
              isVerified: true,
            };
          } else {
            payload = {
              ...userData,
              uid: user.uid,
              about: '',
              classes: [],
              courseInProgressStudent: 0,
              courseInProgressTeacher: 0,
              pendingQA: 0,
              coursesOffered: [],
              dob: '',
              dp: '',
              specialisation: '',
              totalEnrolled: 0,
              isVerified: true,
            };
          }
        } else {
          payload = {
            firstName,
            lastName,
            uid: user.uid,
            role: 1,
            about: '',
            address: '',
            age: '',
            city: '',
            classes: [],
            courseInProgressStudent: 0,
            courseInProgressTeacher: 0,
            coursesOffered: [],
            dob: '',
            dp: '',
            email,
            isTeacher: false,
            occupation: '',
            pendingQA: 0,
            phone: '',
            school: '',
            specialisation: '',
            state: '',
            totalEnrolled: 0,
            university: '',
            isVerified: true,
          };
        }

        addUser(payload).then(() => {
          localStorage.setItem('role', payload.role);
          localStorage.setItem('isTeacher', payload.isTeacher);
          dispatch(confirmedSignupAction(payload));
        });
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message;
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(payload) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload,
  };
}

export function loginAction({ email, password }) {
  return (dispatch) => {
    dispatch(loadingToggleAction(true));
    getUserAnonymous(email).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();

        if (doc.data().isVerified) {
          login(email, password)
            .then((response) => {
              getUser(response.user.uid).then((docSnap) => {
                if (docSnap.exists()) {
                  localStorage.setItem('role', docSnap.data().role);
                  localStorage.setItem('isTeacher', docSnap.data().isTeacher);
                  dispatch(loginConfirmedAction(docSnap.data()));
                  dispatch(loadingToggleAction(false));
                }
              });
            })
            .catch((error) => {
              console.log(error);
              const errorCode = error.code;
              let errorMessage = 'Login failed';
              if (errorCode === 'auth/user-not-found') errorMessage = 'User is not present';
              else errorMessage = "Email Id and password doesn't match";
              dispatch(loginFailedAction(errorMessage));
              dispatch(loadingToggleAction(false));
            });
        } else {
          dispatch(
            signupAction({
              email,
              password,
              userData,
            })
          );

          deleteDocument(`users/${doc.id}`);
        }
      });
    });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function logoutAction(navigate) {
  localStorage.removeItem('userDetails');
  navigate('/login');
  return {
    type: LOGOUT_ACTION,
  };
}

export function addUserAnonymousAction(payload, loggedInUser) {
  return (dispatch) => {
    addUserAnonymous(payload)
      .then(() => {
        // show success message
        let updateListPayload = {};
        if (payload.isTeacher) {
          updateListPayload = {
            Teacherlist: [
              ...loggedInUser.Teacherlist,
              {
                name: `${payload.firstName} ${payload.lastName}`,
                isVerified: payload.isVerified,
                status: '1',
                courses: [],
                dp: '',
                id: '',
              },
            ],
          };
        } else {
          updateListPayload = {
            studentList: [
              ...loggedInUser.studentList,
              {
                name: `${payload.firstName} ${payload.lastName}`,
                isVerified: payload.isVerified,
                status: '1',
                courses: [],
                dp: '',
                id: '',
                role: ['student'],
              },
            ],
          };
        }
        updateAnonymousUserList(loggedInUser.uid, updateListPayload).then(() => {
          dispatch(
            getUser(loggedInUser.uid).then((docSnap) => {
              if (docSnap.exists()) {
                localStorage.setItem('role', docSnap.data().role);
                localStorage.setItem('isTeacher', docSnap.data().isTeacher);
                dispatch(loginConfirmedAction(docSnap.data()));
                dispatch(loadingToggleAction(false));
                dispatch(HideModalAction(true));
              }
            })
          );
        });
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
}

export function HideModalAction(status) {
  return {
    type: HIDE_MODAL_ACTION,
    payload: { status },
  };
}

export function getDatafromDBAction(path, collection, nodeName) {
  return (dispatch) => {
    getDatafromDB(path, collection).then((data) => {
      if (collection) {
        let collectionsObj = {};
        data.forEach((doc) => {
          collectionsObj = {
            ...collectionsObj,
            [doc.id]: doc.data(),
          };
        });
        dispatch(getDatafromDBActionConfirmed(collectionsObj, nodeName));
      } else {
        dispatch(getDatafromDBActionConfirmed(data.data(), nodeName));
      }
    });
  };
}

export function getDatafromDBActionConfirmed(data, nodeName) {
  return {
    type: GET_DATA_ACTION,
    payload: { data, nodeName },
  };
}

export function updateDatainDBAction(path, payload) {
  return (dispatch) => {
    updateDatainDB(path, payload);
  };
}
