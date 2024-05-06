import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MenuItem, SidebarMenuComponent } from '../utilities/components/sidebar-menu/sidebar-menu.component';
import { Router } from '@angular/router';
import { faBars, faBoxesStacked, faChartColumn, faClipboardUser, faFileMedical, faHospital, faTablets } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements AfterViewInit{

  @ViewChild(SidebarMenuComponent) sidebarMenu: SidebarMenuComponent; //objecto para acceder a todos los metodos declarados en el componente Sidebar Menu

  constructor(private router: Router, private alert: AlertService) { }

  ngAfterViewInit(): void {
    const currentRoute = this.router.url; //url principal
    let pageItem = this.pages.filter(page => page.Url.includes(currentRoute))[0]; //se hace el filtrado del objecto donde se declararon las url y los permisos 
    if(!this.sidebarMenu.hasPermissions(pageItem)){ // si esta condicion se cumple, se le dara acceso al usuario si hace la navegación mediante links
      this.alert.error('Ups...','No cuenta con los permisos suficientes para ver este apartado, favor de solicitarlos al administrador del sistema');
      this.logout()
    }
  }
  redirect(url) {
    const navigationDetails: string[] = [url]; 
    this.router.navigate(navigationDetails);
  }
  bars = faBars;
  appIcon = faHospital
  showMenu: boolean;
  /**
   * mapeo de las url's y permisos que tendran los usuarios, si no se declaran las 
   * propiedades Role ni UserMainRole, el componente da por hecho que es un componente publico
   */
  pages: MenuItem[] = [
    {Url: '/pages/dashboard', Icon: faChartColumn, Title: 'Dashboard', Role: [1], UserMainRole: +localStorage.getItem('hospitium-role')},
    {Url: '/pages/inventory', Icon: faBoxesStacked, Title: 'Inventario', Role: [1], UserMainRole: +localStorage.getItem('hospitium-role')},
    {Url: '/pages/attend-appointment', Icon: faClipboardUser, Title: 'Atender citas', Role: [2], UserMainRole: +localStorage.getItem('hospitium-role')},
    {Url: '/pages/appointments', Icon: faFileMedical, Title: 'Citas médicas', Role: [3], UserMainRole: +localStorage.getItem('hospitium-role')},
    {Url: '/pages/prescription', Icon: faTablets, Title: 'Medicamentos recetados', Role: [3], UserMainRole: +localStorage.getItem('hospitium-role')},
    
  ];
  //manejo de la visibilidad del sidebar menu
  show(){
    this.showMenu = true;
  }
  //manejo de la visibilidad del sidebar menu
  hide(event){
    this.showMenu = event;
  }
  logout() {
    localStorage.removeItem('hospitium-role');
    localStorage.removeItem('hospitium-id');
    this.redirect('')
  }
}
