import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser } from 'firebase/auth'
import { auth, db } from './firebase'
import { useQuery } from '@tanstack/react-query';

export enum UserType {
  admin,
  user,
  medical,
}
export enum BloodType { AM, BM, ABM, OM, AP, BP, ABP, OP };


const googleProvider = new GoogleAuthProvider();

export type User = {
  id: string;
  firebase: FirebaseUser;
  active?: boolean;
  created: Date;
  fullname: string;
  photo?: string;
  type: UserType,
  // copy: string;
  phone: string;
  address: string;
  male: boolean;
  dob: Date;
  bloodType: BloodType;
  donation: boolean;
  // privacy:
}

export let _user: User | boolean = false;

export function useUser() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  return {
    user: data,
    error,
    isLoading,
    setUser: (value: User | boolean) => {
      _user = value;
      refetch();
    },
  };
}

export async function login() {
  await signInWithPopup(auth, googleProvider).then(async result => {
    if (result.user) {
      // console.log(user);
      const dbUser = await db.collection('user')
        .doc(result.user?.uid).get()
        .then(doc => doc.data());
        if (dbUser) {
          ///
          _user = {
            id: dbUser.id,
            firebase: result.user,
            active: dbUser.active,
            created: dbUser.created.toDate(),
            fullname: dbUser.fullname,
            photo: dbUser.photo,
            type: dbUser.type,
            // copy: dbUser.copy,
            phone: dbUser.phone,
            address: dbUser.address,
            male: dbUser.male,
            dob: dbUser.dob.toDate(),
            bloodType: dbUser.bloodType,
            donation: dbUser.donation,
          };
          console.log('logged in');
        } else {
          console.log('No such user!');
          _user = true;
        }
    }
  })
  .catch(error => {
    console.error(error);
    _user = false;
  });
  return _user;
}

export async  function logout() {
  await auth.signOut();
  _user = false;
  return _user;
}

export async function getUser() {
  if (!auth.currentUser) {
    _user = false;
  }
  return _user;
}