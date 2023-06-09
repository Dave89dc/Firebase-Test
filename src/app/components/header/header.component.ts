import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user?: User | null;

  constructor(public auth: AuthService){}

  ngOnInit(){
    this.auth.userSubject.subscribe({//(user) => {
      //this.user = user;
      next: user => this.user = user,
      error: err => console.log(err)
    });
  }

  // logIn(){ QUESTO SE NEL COSTRUTTORE CI FOSSE "PRIVATE"
  //   this.auth.signIn();
  // }

  // logOut(){ QUESTO SE NEL COSTRUTTORE CI FOSSE "PRIVATE"
  //   this.auth.signOut();
  // }

}
