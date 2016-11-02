import {Stations} from './stationlist';
import {Injectable} from 'angular2/core';
import {Station} from './Station';
import {Http, Headers, Response} from 'angular2/http';

import { RuntimeCompiler} from 'angular2/src/compiler/runtime_compiler';

import 'rxjs/add/operator/map';


import {Observable} from 'rxjs/Observable'; 
declare var X2JS;
@Injectable()
export class StationService {
   
  constructor(private http: Http) {
  }
    getStations()
    {
        return Promise.resolve(Stations);
    }
    getStation(name: number) {
      
      // console.log("Running the get on: "+name);
      // console.log("Trying something risky:"+JSON.stringify(Promise.resolve(Stations).then(stations => stations.filter(station => station.PARENT_STOP_ID === name)[0])));
      
  return Promise.resolve(Stations).then(
    stations => stations.filter(station => station.PARENT_STOP_ID === name)
  );
  }
  
    getArrivalTime(URL: string)
    {
    
      console.log(URL);
      var temp=this.http.post(URL,null).map(this.extractData);
      console.log("2");
      return temp;
    }
    extractData(res: Response)
    {
      //console.log (res);
      let xml =res.text();
      //console.log(xml);
      let x2js= new X2JS();
      let str=x2js.xml_str2json(xml);
       console.log("str="+str);
      console.log("Wrapping up new http call");
      console.log(JSON.stringify(str));
      return str;
    }
  
}