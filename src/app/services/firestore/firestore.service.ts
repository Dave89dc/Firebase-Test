import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc, collection, getDocs, Firestore } from "firebase/firestore";
import { Manga } from '../../model/manga';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db: Firestore;

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
}
