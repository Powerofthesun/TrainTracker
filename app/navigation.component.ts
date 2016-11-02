import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {AppComponent} from './app.component'
import {SelectedStation} from './selected.component';
import{StationService} from './station.service';
import {HTTP_PROVIDERS} from 'angular2/http';
@Component({
  selector: 'menu',
  template: `
  <nav>
    <a [routerLink]="['App']"></a>
  </nav>
  <router-outlet></router-outlet>
`,
  directives: [ROUTER_DIRECTIVES],
providers: [
  ROUTER_PROVIDERS,
  StationService,
  HTTP_PROVIDERS
]
})
@RouteConfig([
 {
  path: '/app',
  name: 'App',
  component: AppComponent,
  useAsDefault: true
},{
  path: '/Station/{station:number}',
  name: 'SelectedStation',
  component: SelectedStation
}
])
export class NavigationComponent {
  title = 'Train Tracker';
}