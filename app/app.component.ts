import { Component, OnInit, Input }       from 'angular2/core';
import { Router} from 'angular2/router';
import {SelectedStation} from './selected.component';
import {StationService} from './station.service';
import {Station} from './station';

import { RuntimeCompiler} from 'angular2/src/compiler/runtime_compiler';
@Component({
  selector: 'my-app',
  template: `
  
   <div class="container-fluid" style="margin-right:30pt;">
   <div class="row">
   <div *ngFor="#Line of Lines">
      <button type="button" id="{{Line}}"class="btn btn-default btn-block" style=" font-size:200%; height:12.5%;" (click) = insertStations(Line)><span style="color:white;">{{Line}}</span></button>
      <div *ngIf="allowedToshow(Line)">
          <div *ngFor="#Station of getStation(Line)">
              <div class="container">
              <div class="row">
                  <button type="button" id="nb"class="btn btn-default btn-block" style="background-color: Grey; font-size:150%; height:8%; " (click)="gotoDetail(Station, Line)"><span>{{Station}}</span></button>
              </div>
              </div>
          </div>
      </div>
    </div>
  </div>
`
,
styles:[
  
  `
  #Red{background-color:#C41334;}
  #Blue{background-color:#1AA2DC}
  #Brown{background-color:#61361E}
  #Purple{background-color: #522996}
  #Green{background-color:#159A3F}
  #Pink{background-color:#E07FA6}
  #Orange{background-color:#F6482A}
  #Yellow{background-color:#F8E132}
  button{
    border-style: none;
     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

button span:after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

button:hover span {
  padding-right: 25px;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}
`]
})
export class AppComponent {
   @Input() StationInfo: Station[];
   
  clicked={"Red": false, "Blue": false, "Purple": false, "Green": false, "Brown": false, "Yellow": false, "Pink": false, "Orange": false,  };
  Lines: string[] = ["Red", "Blue", "Brown",  "Green", "Orange", "Purple","Pink","Yellow"];
  StationList:{};
  constructor(private _router: Router,  private _stationService: StationService
    ,private _runtimeCompiler: RuntimeCompiler){}
  ngOnInit() 
  {
    this._runtimeCompiler.clearCache();
    this._stationService.getStations().then(StationInfo => this.StationInfo=StationInfo);
  }
  getStation(name: string)
  {
    var temp =this. StationInfo.filter(station => station[name]==1 ).map(function(station){return station.STATION_NAME});
    temp=this.uniq_fast(temp);
    return temp;
  }
  insertStations(name: string)
  {
    this.clicked[name]=!this.clicked[name];
  }
  allowedToshow(ngIfName:string)
  {
    return this.clicked[ngIfName]
  }
   gotoDetail(stn:string, lne: string) {
    var temp=this.StationInfo.filter(station=>station[lne]==1 && station.STATION_NAME==stn).map(function(station){return station.PARENT_STOP_ID});
    let link = ['SelectedStation', { station: temp[0] }];
    this._router.navigate(link);
  }
  private uniq_fast(a)
  {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
  }
} 
 


 