import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { User } from 'firebase/auth';
import { Manga } from '../models/manga/manga';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user?: User | null;

  constructor(public auth: AuthService){}

  ngOnInit(){
    this.auth.userSubject.subscribe((user) => {
      this.user = user;
      console.log('User: ',this.user)
    });
  }

}
