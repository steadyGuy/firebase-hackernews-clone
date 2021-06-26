import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config';

export interface IFirebase {
  auth: app.auth.Auth;
  register: (name: string, email: string, password: string) => Promise<void | undefined>;
  login: (email: string, password: string) => Promise<app.auth.UserCredential>;
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

class Firebase {

  public auth;

  constructor() {
    app.initializeApp(firebaseConfig);
    // app.analytics();
    this.auth = app.auth();
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