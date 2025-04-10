import { inject, Injectable } from '@angular/core';
import { Auth, AuthProvider, authState, browserLocalPersistence, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithPopup, User, UserCredential } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() {

    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  private auth: Auth = inject(Auth);

  private user: any = null;

  private userSubject = new BehaviorSubject<User | null>(null);

  readonly authState$ = authState(this.auth);

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return this.callPopup(provider);
  }

  async callPopup(provider: AuthProvider) : Promise<UserCredential>{
    try{
      const result = await signInWithPopup(this.auth, provider);
      this.user = result;
      return result;
    }catch (error: any) {
      return error;
    }
  }

  getUser() {
    return this.user;
  }

  clearUser() {
    this.user = null;
  }

  async signOut() {
    try{
      await this.auth.signOut();
      this.user = null;
    }catch (error: any) {
      throw error;
    }
  }

  observeAuthState() {
    return this.userSubject.asObservable();
  }
  
}
