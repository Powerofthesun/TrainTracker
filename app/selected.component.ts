import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import {StationService} from './station.service';
import {Station} from './station';
import {Http, Headers,HTTP_PROVIDERS, Response} from 'angular2/http';
import { RuntimeCompiler} from 'angular2/src/compiler/runtime_compiler';
import { TemplateCompiler } from 'angular2/src/compiler/template_compiler';
@Component({
  selector: 'Selected-Station',
  template:`

    <h1 style="color:white;">{{currentName}}</h1>
    <span><button  class = "back" (click)="goBack()" ><span>Back</span></button><button class = "refresh"(click)="refresh()" ><span>Refresh</span></button></span>
    <div *ngIf="waiting()"><h3 style= "color: white;">Loading...</h3></div>
    <div *ngIf="allowedToshow()">
    <div class="list-group" style="margin-right:30pt;">
    <div *ngFor="#arrival of getTimes()">
   
      <div class="list-group-item" id="{{arrival[3]}}"style="background-color: height: 20%;"><h1 style="text-align:center; font-size: 200%; color:white;">{{arrival[0]}}</h1><h2 style="text-align:center; font-size: 200%; color:white;">{{arrival[2]}}</h2> </div> 
      </div>
    </div>
  `,
  styles:[`
  #Red{background-color:#C41334;}
  #Blue{background-color:#1AA2DC}
  #Brown{background-color:#61361E}
  #Purple{background-color: #522996}
  #Green{background-color:#159A3F}
  #Pink{background-color:#E07FA6}
  #Orange{background-color:#F6482A}
  #Yellow{background-color:#F8E132}
  h1{
    font-size:400%;
  }
  @keyframes example {
    from {left: 125%;}
    to {left:0%}
  }
  .list-group-item
  {
    border-style:none;
    margin-bottom: 2px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    animation-name: example;
    animation-duration: 1.5s;
  }
  button {
    
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: grey; /* Green */
    border: none;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
}
button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.refresh span:after {
  content: '↺';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
.back span:after {
  content: '<<';
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
  `],
  providers:[HTTP_PROVIDERS]
})
export class SelectedStation implements OnInit {
  @Input() StationInfo: Station[];
  currentId : number;
  currentName: string="Loading...";
  xmlInput: Object;
  arrivalList=new Array();
  allowed2Show=false;
  subscription;
  constructor(
    private _routeParams: RouteParams,
    private _stationService: StationService,
    private http: Http
    ,private _runtimeCompiler: RuntimeCompiler,
    private _templateCompiler: TemplateCompiler) {}
  
  ngOnInit() {
    var headers = new Headers();
    let s= parseInt(this._routeParams.get('station'));
    this.currentId=s;
    this._stationService.getStation(s)
      .then(StationInfo => 
              {
              this.StationInfo=StationInfo
              this.currentName=this.StationInfo[0].STATION_DESCRIPTIVE_NAME;
              var URL = "https://crossorigin.me/http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=PUTYOURCTAKEYHERE="+this.currentId;
              this.subscription=this._stationService.getArrivalTime(URL).subscribe(info=>{this.xmlInput=info;this.arrivalCleanUp();});
              
           });
  }
  goBack() {
    window.history.back();
  }
  waiting()
  {
    return !this.allowed2Show;
  }
  allowedToshow()
  {
    return this.allowed2Show;
  }
  arrivalCleanUp()
  {
   try{
        let temp=[]
        for (var i = 0; i<this.xmlInput["ctatt"]["eta"].length;i++)
        {
         temp.push([this.xmlInput["ctatt"]["eta"][i]["destNm"],this.xmlInput["ctatt"]["tmst"].split(" ")[1],this.xmlInput["ctatt"]["eta"][i]["arrT"].split(" ")[1], this.xmlInput["ctatt"]["eta"][i]["rt"]]);
        }
        for(var x = 0; x<temp.length;x++)
        {
         temp[x][2]=parseInt(temp[x][2].split(":")[1]);
          temp[x][1]=parseInt(temp[x][1].split(":")[1]);
          if(temp[x][2]-temp[x][1]<0)
          {
            temp[x][2]=temp[x][2]+60;
          }
           temp[x][2]=temp[x][2]-temp[x][1];
           console.log(temp.toString());
            switch(temp[x][3])
            {
                case "Brn":temp[x][3]="Brown";break;
                case "P" :temp[x][3]="Purple";break;
                case "G" :temp[x][3]="Green";break;
                case "Y": temp[x][3]="Yellow";break;
                case"Org": temp[x][3]="Orange";break;
                default:console.log("Okay!");
            }
       }
       this.arrivalList=temp;
    }
    catch(Exception)
    {
      console.log(Exception);
      console.log("ECODE-"+this.xmlInput["ctatt"]["errCd"]+"\t typeof-"+typeof(this.xmlInput["ctatt"]["errCd"]));
      if(this.xmlInput["ctatt"]["errCd"]=="0")
      {
        console.log("No arrivals");
      }
      else{console.log("Fatal Error");}
    }
      this.allowed2Show=true;
  } 
  getTimes()
  {
   return this.arrivalList;
  }
  refresh()
  {
    
    this.subscription.unsubscribe();
    this._templateCompiler.clearCache();
    this._runtimeCompiler.clearCache();
    var URL = "https://crossorigin.me/http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=d516af313f724fce8497ef728eab5f54&max=12&mapid="+this.currentId;
    this.subscription=this._stationService.getArrivalTime(URL).subscribe(info=>{this.xmlInput=info;console.log(JSON.stringify(info));this.arrivalCleanUp();});
  }
} 