import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignINComponent implements OnInit {
  public userId: string;
  public password: string;
  public temp: string;
  public isLoggedIn: boolean;
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
                this.router.navigateByUrl('/dash');
              }
            });
          }
        });
      }
    });
  }

}
