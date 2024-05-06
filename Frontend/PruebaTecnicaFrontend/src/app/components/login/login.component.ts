import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private dialog: DialogService, private apiService: ApiService){}

  createAccountIcon = faUserPlus;
  loginIcon = faRightToBracket;

  password: any = '';
  phone: string = '';
  loading: boolean = false;

  redirect(url: string){
    const navigationDetails: string[] = [url];
    this.router.navigate(navigationDetails);
  }

  createAccount(){
    let create = this.dialog.open(CreateAccountComponent, {
      header: 'Crear Cuenta',
      width: '50%',
      contentStyle: {"overflow" : "auto"},
      baseZIndex: 10000,
      maximizable: false
    })
  }

  doLogin(){
    this.loading = true;
    const params = {
      phone: this.phone.replaceAll('-', ''),
      password: this.password
    }
    this.apiService.PostMethod(params, 'Users/Login').subscribe(x =>{
      if(!x['error']){
        this.loading = false
        console.log(x['data'].user)
        localStorage.setItem('hospitium-role', x['data'].user.roleId.toString());
        localStorage.setItem('hospitium-id', x['data'].user.id.toString());
        this.redirect(x['data'].mainModule)
      }else{
        this.loading = false
      }
    })
  }
}
