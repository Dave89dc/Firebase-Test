import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseConfig = {
    apiKey: "AIzaSyCDEGc5mcwVg8HXCOMng7KXTdV4Li7IiBY",
    authDomain: "super-progetto-47c1d.firebaseapp.com",
    projectId: "super-progetto-47c1d",
    storageBucket: "super-progetto-47c1d.appspot.com",
    messagingSenderId: "588867507476",
    appId: "1:588867507476:web:0d2fa857edcd0d2a049e01"
  }

  app = initializeApp(this.firebaseConfig);

  constructor() { }
}
