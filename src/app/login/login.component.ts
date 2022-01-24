import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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

  ngOnInit() {

  }

  public signIn() {
    this.storageService.checkUser(this.userId).then((result) => {
      if (result) {
        console.log('user found!checking cred');
        this.storageService.getUserDetails(this.userId).then((res)=>{
          const cred = JSON.parse(res);
          if(this.userId===cred.userId && this.password=== cred.password){
            this.isLoggedIn = true;
            this.storageService.setLoggedInUserDetails(res).then((r)=>{
              if(r){
                this.router.navigateByUrl('/dashboard');
              }
            });
          }
        });
      }
    });
  }

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
          console.log('Data is saved');
        })
        .catch((e) => {
          console.log('error: ' + e);
        });
    }
  }

  public show(): void {
    this.storageService
      .getAllUsers()
      .then((result) => {
        if (result != null) {
          this.result = JSON.parse(result);
          //Object.assign({}, ['a', 'b', 'c'])
          console.log('Username: ' + result);
        }
      })
      .catch((e) => {
        console.log('error: ' + e);
        // Handle errors here
      });
  }
}
