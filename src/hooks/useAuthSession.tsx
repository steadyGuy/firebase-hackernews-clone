import { useEffect, useState } from 'react'
import myFirebase from '../firebase'
import firebase from 'firebase';

const useAuthSession = () => {

  const [authUser, setAuthUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const unsubscribe = myFirebase.auth.onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        return setAuthUser(user);
      }
      setAuthUser(null);
    });

    return () => unsubscribe();
  }, [])

  return authUser;
}

export default useAuthSession
