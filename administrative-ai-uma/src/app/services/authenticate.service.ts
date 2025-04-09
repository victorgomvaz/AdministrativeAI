import { inject, Injectable } from '@angular/core';
import { Auth, AuthProvider, authState, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  private auth: Auth = inject(Auth);

  readonly authState$ = authState(this.auth);

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return this.callPopup(provider);
  }

  async callPopup(provider: AuthProvider) : Promise<UserCredential>{
    try{
      const result = await signInWithPopup(this.auth, provider);
      return result;
    }catch (error: any) {
      return error;
    }
  }
}
