import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './config';

export interface IFirebase {
  auth: app.auth.Auth;
  db: app.firestore.Firestore;
  register: (name: string, email: string, password: string) => Promise<void | undefined>;
  login: (email: string, password: string) => Promise<app.auth.UserCredential>;
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

class Firebase {

  public auth;
  public db;

  constructor() {
    app.initializeApp(firebaseConfig);
    // app.analytics();
    this.auth = app.auth();
    this.db = app.firestore();
  }

  async register(name: string, email: string, password: string) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email, password
    );

    return newUser.user?.updateProfile({
      displayName: name,
    });

  }

  async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await this.auth.signOut();
  }

  async resetPassword(email: string) {
    await this.auth.sendPasswordResetEmail(email);
  }

}

export default new Firebase();