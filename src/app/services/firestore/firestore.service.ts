import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc, collection, getDocs, Firestore, setDoc } from "firebase/firestore";
import { FirebaseService } from '../firebase/firebase.service';
import { Manga } from 'src/app/models/manga/manga';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db: Firestore;

  dbUserSubject: Subject<any> = new Subject(); // per tenere traccia dell'utente

  constructor(private firebase: FirebaseService) {
    this.db = getFirestore(this.firebase.app);
   }

  getManga(id: string): Promise<Manga | null>{
    const docRef = doc(this.db, "manga", id);
    return getDoc(docRef).then(document => {
      if(document.exists()){
        return {id: document.id, ...document.data()} as Manga;
      } else{
        return null;
      }
    });
  }

  getMangas(): Promise<Manga[]>{
    const collectionref = collection(this.db, 'manga');
    return getDocs(collectionref).then(col => {
      return col.docs.map(doc => ({id: doc.id, ...doc.data()} as Manga));
    })
  }

  getUser(id: string): Promise<any | null>{ // per tenere traccia dell'utente
    const docRef = doc(this.db, "users", id);
    return getDoc(docRef).then(document => {
      if(document.exists()){
        return {id: document.id, ...document.data()} as any;
      } else{
        return null;
      }
    });
  }

  saveUser(user: any){
    const docRef = doc(this.db, 'users', user.uid);
    return setDoc(docRef, {email: user.email})
    .then(() => console.log('Utente salvato'))
    .catch((err) => console.log(err));
  }

}
