import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  public userId: string;
  public password: string;
  public temp: string;
  public isLoggedIn: boolean;
  public data = {
    name: '',
    userId: '',
    password: '',
    email: '',
  };
  public result;
  constructor(private router: Router, public storageService: StorageService) {}

  ngOnInit() {}

  public signUp() {
    let isDuplicate = false;
    this.storageService
      .addUser(this.data.userId)
      .then((result) => {
        if (result) {
          isDuplicate = false;
          console.log('user added');
        } else {
          isDuplicate = true;
          return;
        }
      })
      .catch((e) => {
        console.log('error: ' + e);
      });
    if (!isDuplicate) {
      this.storageService
        .set(this.data.userId, JSON.stringify(this.data))
        .then((result) => {
          if(result){
            this.router.navigateByUrl('/auth/signIn');
          }
          console.log('Data is saved');
        })
        .catch((e) => {
          console.log('error: ' + e);
        });
    }
  }

}
