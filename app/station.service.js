System.register(['./stationlist', 'angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var stationlist_1, core_1, http_1;
    var StationService;
    return {
        setters:[
            function (stationlist_1_1) {
                stationlist_1 = stationlist_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            StationService = (function () {
                function StationService(http) {
                    this.http = http;
                }
                StationService.prototype.getStations = function () {
                    return Promise.resolve(stationlist_1.Stations);
                };
                StationService.prototype.getStation = function (name) {
                    // console.log("Running the get on: "+name);
                    // console.log("Trying something risky:"+JSON.stringify(Promise.resolve(Stations).then(stations => stations.filter(station => station.PARENT_STOP_ID === name)[0])));
                    return Promise.resolve(stationlist_1.Stations).then(function (stations) { return stations.filter(function (station) { return station.PARENT_STOP_ID === name; }); });
                };
                StationService.prototype.getArrivalTime = function (URL) {
                    console.log(URL);
                    var temp = this.http.post(URL, null).map(this.extractData);
                    console.log("2");
                    return temp;
                };
                StationService.prototype.extractData = function (res) {
                    //console.log (res);
                    var xml = res.text();
                    //console.log(xml);
                    var x2js = new X2JS();
                    var str = x2js.xml_str2json(xml);
                    console.log("str=" + str);
                    console.log("Wrapping up new http call");
                    console.log(JSON.stringify(str));
                    return str;
                };
                StationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], StationService);
                return StationService;
            }());
            exports_1("StationService", StationService);
        }
    }
});
//# sourceMappingURL=station.service.js.map