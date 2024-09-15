import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { auth, db } from './firebase'

const googleProvider = new GoogleAuthProvider();

export let user: User | undefined;
export async function login() {
  signInWithPopup(auth, googleProvider).then(async result => {
    if (result.user) {
      // console.log(user);
      const dbUser = await db.collection('user')
        .doc(result.user?.uid).get()
        .then(doc => doc.data());
        if (dbUser) {
          ///
          user = result.user;
          console.log('logged in');
        } else {
          console.log('No such user!');
        logout();
      }
    }
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