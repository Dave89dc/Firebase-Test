import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Auth, User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: Auth;

  provider: GoogleAuthProvider;

  userSubject: Subject<User | null> = new Subject();

  constructor(private firebase: FirebaseService) {
    this.auth = getAuth(this.firebase.app);
    this.provider = new GoogleAuthProvider();
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
          this.userSubject.next(user);
      } else {
        console.log('Nessuno è loggato');
        this.userSubject.next(null);
      }
    });
  }

  signIn(){
    signInWithPopup(this.auth, this.provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    const user = result.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }

  signOut() {
    signOut(this.auth)
      .then(() => {
        this.userSubject.next(null);
      })
      .catch((error) => {
        console.log('Errore durante il logout:', error);
      });
  }
}
