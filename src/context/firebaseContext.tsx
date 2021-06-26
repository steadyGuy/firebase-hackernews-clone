import { createContext, FC } from 'react';
import myFirebase from '../firebase';
import firebase from 'firebase';
import { IFirebase } from '../firebase/firebase';
import useAuthSession from '../hooks/useAuthSession';

export type FirebaseContextProps = {
  firebase: IFirebase
  user: firebase.User | null;
}

export const FirebaseContext = createContext<FirebaseContextProps>({ firebase: myFirebase, user: null as any });

export const FirebaseProvider: FC = ({ children }) => {

  const user = useAuthSession();

  return (
    <FirebaseContext.Provider value={{ user, firebase: myFirebase }}>
      {children}
    </FirebaseContext.Provider>
  );
}