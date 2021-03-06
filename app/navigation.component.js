System.register(['angular2/core', 'angular2/router', './app.component', './selected.component', './station.service', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, app_component_1, selected_component_1, station_service_1, http_1;
    var NavigationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (selected_component_1_1) {
                selected_component_1 = selected_component_1_1;
            },
            function (station_service_1_1) {
                station_service_1 = station_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            NavigationComponent = (function () {
                function NavigationComponent() {
                    this.title = 'Train Tracker';
                }
                NavigationComponent = __decorate([
                    core_1.Component({
                        selector: 'menu',
                        template: "\n  <nav>\n    <a [routerLink]=\"['App']\"></a>\n  </nav>\n  <router-outlet></router-outlet>\n",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            station_service_1.StationService,
                            http_1.HTTP_PROVIDERS
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/app',
                            name: 'App',
                            component: app_component_1.AppComponent,
                            useAsDefault: true
                        }, {
                            path: '/Station/{station:number}',
                            name: 'SelectedStation',
                            component: selected_component_1.SelectedStation
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], NavigationComponent);
                return NavigationComponent;
            }());
            exports_1("NavigationComponent", NavigationComponent);
        }
    }
});
//# sourceMappingURL=navigation.component.js.map