System.register(['angular2/core', 'angular2/router', './station.service', 'angular2/src/compiler/runtime_compiler'], function(exports_1, context_1) {
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
    var core_1, router_1, station_service_1, runtime_compiler_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (station_service_1_1) {
                station_service_1 = station_service_1_1;
            },
            function (runtime_compiler_1_1) {
                runtime_compiler_1 = runtime_compiler_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_router, _stationService, _runtimeCompiler) {
                    this._router = _router;
                    this._stationService = _stationService;
                    this._runtimeCompiler = _runtimeCompiler;
                    this.clicked = { "Red": false, "Blue": false, "Purple": false, "Green": false, "Brown": false, "Yellow": false, "Pink": false, "Orange": false, };
                    this.Lines = ["Red", "Blue", "Brown", "Green", "Orange", "Purple", "Pink", "Yellow"];
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._runtimeCompiler.clearCache();
                    this._stationService.getStations().then(function (StationInfo) { return _this.StationInfo = StationInfo; });
                };
                AppComponent.prototype.getStation = function (name) {
                    var temp = this.StationInfo.filter(function (station) { return station[name] == 1; }).map(function (station) { return station.STATION_NAME; });
                    temp = this.uniq_fast(temp);
                    return temp;
                };
                AppComponent.prototype.insertStations = function (name) {
                    this.clicked[name] = !this.clicked[name];
                };
                AppComponent.prototype.allowedToshow = function (ngIfName) {
                    return this.clicked[ngIfName];
                };
                AppComponent.prototype.gotoDetail = function (stn, lne) {
                    var temp = this.StationInfo.filter(function (station) { return station[lne] == 1 && station.STATION_NAME == stn; }).map(function (station) { return station.PARENT_STOP_ID; });
                    var link = ['SelectedStation', { station: temp[0] }];
                    this._router.navigate(link);
                };
                AppComponent.prototype.uniq_fast = function (a) {
                    var seen = {};
                    var out = [];
                    var len = a.length;
                    var j = 0;
                    for (var i = 0; i < len; i++) {
                        var item = a[i];
                        if (seen[item] !== 1) {
                            seen[item] = 1;
                            out[j++] = item;
                        }
                    }
                    return out;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], AppComponent.prototype, "StationInfo", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n  \n   <div class=\"container-fluid\" style=\"margin-right:30pt;\">\n   <div class=\"row\">\n   <div *ngFor=\"#Line of Lines\">\n      <button type=\"button\" id=\"{{Line}}\"class=\"btn btn-default btn-block\" style=\" font-size:200%; height:12.5%;\" (click) = insertStations(Line)><span style=\"color:white;\">{{Line}}</span></button>\n      <div *ngIf=\"allowedToshow(Line)\">\n          <div *ngFor=\"#Station of getStation(Line)\">\n              <div class=\"container\">\n              <div class=\"row\">\n                  <button type=\"button\" id=\"nb\"class=\"btn btn-default btn-block\" style=\"background-color: Grey; font-size:150%; height:8%; \" (click)=\"gotoDetail(Station, Line)\"><span>{{Station}}</span></button>\n              </div>\n              </div>\n          </div>\n      </div>\n    </div>\n  </div>\n",
                        styles: [
                            "\n  #Red{background-color:#C41334;}\n  #Blue{background-color:#1AA2DC}\n  #Brown{background-color:#61361E}\n  #Purple{background-color: #522996}\n  #Green{background-color:#159A3F}\n  #Pink{background-color:#E07FA6}\n  #Orange{background-color:#F6482A}\n  #Yellow{background-color:#F8E132}\n  button{\n    border-style: none;\n     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  }\n  button span {\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  transition: 0.5s;\n}\n\nbutton span:after {\n  content: '\u00BB';\n  position: absolute;\n  opacity: 0;\n  top: 0;\n  right: -20px;\n  transition: 0.5s;\n}\n\nbutton:hover span {\n  padding-right: 25px;\n}\n\nbutton:hover span:after {\n  opacity: 1;\n  right: 0;\n}\n"]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, station_service_1.StationService, runtime_compiler_1.RuntimeCompiler])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map