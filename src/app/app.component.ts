import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore/firestore.service';
import { Manga } from './models/manga/manga';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-test';

  mangas: Manga[] = [];

  constructor(private firestore: FirestoreService){
    this.firestore.getManga('KeKAI7XhRRJbqOMNxE8w').then(manga => console.log(manga));
    this.firestore.getMangas().then(mangasFromDb => {
      // for (let i = 0; i < mangas.length; i++) {
      //   const element = mangas[i];
      //   console.log('Collection: ', element);
      // }
      this.mangas = mangasFromDb;
    });
  }

}
