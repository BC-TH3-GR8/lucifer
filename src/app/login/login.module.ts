import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SignINComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRoutingModule,
    IonicStorageModule
  ],
  declarations: [LoginComponent,SignINComponent,SignUpComponent]
})
export class LoginModule {}
