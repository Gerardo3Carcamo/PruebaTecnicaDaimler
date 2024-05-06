import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faIdCard, faKey, faPhone, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit{

  constructor(private apiService: ApiService, private alertService: AlertService, private ref: DynamicDialogRef){}

  ngOnInit(): void {
    this.getRolesAvailable();
  }

  //Icons
  userNameIcon = faIdCard;
  phoneIcon = faPhone;
  roleIcon = faUserTie;
  passwordIcon = faKey;

  //Variables
  userName: string = '';
  phone: string = '';
  role: number = undefined;
  password: string = '';
  rolesDrop: any = []

  //Methods
  createNewAccount(){
    const params = {
      name: this.userName,
      phone: this.phone.replaceAll('-', ''),
      password: this.password,
      roleId: this.role
    };
    this.apiService.PostMethod(params, 'Users/AddNewUser').subscribe(x =>{
      if(!x['error']){
        this.ref.close();
        this.alertService.success('Ok', x['message']);
      }else{
        this.ref.close();
        this.alertService.error('Error', x['message']);
      }
    });
  }
  
  getRolesAvailable(){
    this.apiService.GetMethod('Role/GetRoles').subscribe(x =>{
      if(!x['error']){
        this.rolesDrop= x['data']
      }else{
        this.alertService.error('Error', x['message']);
      }
    });
  }
}
