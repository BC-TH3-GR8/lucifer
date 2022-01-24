import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public userDetails ;
  constructor(private router: Router, public storageService: StorageService) {}

  public init(){
  }
  async ngOnInit() {
    await this.storageService.getLoggedInUserDetails().then(async (res) => {
      if (res) {
        this.userDetails = await JSON.parse(res);
      } else {
        console.log('login again');
        this.logout();
      }
    });
  }
  public logout(): void {
    this.storageService.clearLogInUserDetails().then((res) => {
      this.router.navigateByUrl('/home');
    });
  }
}
