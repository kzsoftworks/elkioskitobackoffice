import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
  FirebaseRealTimeSaga
} from "react-admin-firebase";
import firebaseConfig from "./firebaseConfig";
import * as firebase from "firebase";

const options = {};

export const authProvider = FirebaseAuthProvider(firebaseConfig, options);
export const dataProvider = FirebaseDataProvider(firebaseConfig, options);
export const firebaseRealtime = FirebaseRealTimeSaga(dataProvider);

export function getFirestore() {
  return firebase.firestore();
}
