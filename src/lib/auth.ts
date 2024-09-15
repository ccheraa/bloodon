import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { auth } from './firebase'

const googleProvider = new GoogleAuthProvider();

export let user: User | undefined;
export function login() {
  signInWithPopup(auth, googleProvider).then(result => {
    user = result.user;
    console.log(user);
  })
  .catch(error => {
    console.error(error);
    user = undefined;
  });
}

export function logout() {
  auth.signOut();
  user = undefined;
}