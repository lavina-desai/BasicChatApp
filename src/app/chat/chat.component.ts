import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: FirebaseListObservable<any[]>;

  constructor(private _db: AngularFireDatabase,private _authService: AuthService) { }

  ngOnInit() {
    this.getChatData();
  }

  getChatData(){
    this.messages = this._db.list('chat_messages');
  }

  newMessage(message) {
	  this.messages.push(message);
  }

  logout() {
    this._authService.logout();
  }

}
