import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  IconDefinition,
  faComputer,
  faLock,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
  constructor(private router: Router) {}
  lock = faLock;
  logoutIcon = faRightFromBracket;
  /**
   * property to add or discard the hover effect when placing the mouse pointer over a menu item.
   */
  protected _hoverEffect: boolean = false;
  @Input() set hoverEffect(flag: boolean) {
    this._hoverEffect = flag;
  }
  /**
   * property to add a title to the menu, if you do not add one, by default it will put the word "Menu".
   */
  protected _appTitle: string = 'Menú';
  @Input() set appTitle(title: string) {
    this._appTitle = title;
  }
  /**
   * property to add an icon to the menu header, if none is added, it will default to the faComputer icon.
   */
  protected _appIcon: any = faComputer;
  @Input() set appIcon(icon: any) {
    this._appIcon = icon;
  }
  /**
   * property to display or hide the side menu
   */
  protected _visible: boolean;
  @Input() set visible(v: boolean) {
    this._visible = v;
  }
  /**
   * property to map all the components that the Menu will have.
   * The property must be an array with JSON objects as follows:
   * [
   *  {
   *    Url: String with the url of the component,
   *    Icon: Font Awesome library icon,
   *    Title: String,
   *    Role: Array of numbers,
   *    UserMainRole: (Here should come the property returned by the AuthenticationService "rol")
   *  },
   *  {
   *    Url: String with the url of the component,
   *    Icon: Font Awesome library icon,
   *    Title: String,
   *    Role: Array of numbers,
   *    UserMainRole: (Here should come the property returned by the AuthenticationService "rol")
   *  },...
   * ]
   */
  protected _items: MenuItem[] = [];
  @Input() set items(i: MenuItem[]) {
    this._items = i;
  }
  /**
   * Emitter to control the visibility of the side menu
   */
  @Output() hideMenu = new EventEmitter<boolean>();
  hide(flag: boolean) {
    this.hideMenu.emit(flag);
  }
  /**
   * Method to redirect to the page that is selected in the side menu.
   * @param url Url of the page to which it is going to be redirected.
   */
  redirect(url) {
    const navigationDetails: string[] = [url];
    this.router.navigate(navigationDetails);
  }
  /**
   * Method to set visibility on menu item (page of menu)
   * @param item param to comparate Roles of page with user role
   * @returns if Roles page match with user role, returns true, else returns false. In case it occurs any exception, return true.
   */
  hasPermissions(item: MenuItem) {
    try {
      return item.Role.includes(item.UserMainRole);
    } catch (exception) {
      return true;
    }
  }
  logout() {
    localStorage.removeItem('hospitium-role');
    localStorage.removeItem('hospitium-id');
    this.redirect('')
  }
}
export interface MenuItem {
  Url: string;
  Icon: IconDefinition;
  Title: string;
  Role?: number[];
  UserMainRole?: number;
}
