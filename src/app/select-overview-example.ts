import {Component} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

interface Food {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
  selector: 'select-overview-example',
  styleUrls: ['select-overview-example.css'],
  templateUrl: 'select-overview-example.html',
})
export class SelectOverviewExample {
  foods: Food[] = [];
  SERVER_URL = 'https://ganeshghag.pythonanywhere.com/extract';


  constructor(private httpClient: HttpClient) { 

  }

  fetchData(url: string): void {
    url = url.trim();
    if (!url) { return; }
    //const headers1 = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    //this.httpClient.get(url,{headers: headers1, responseType:'text'}).subscribe((res)=>{
    //console.log(res);
    //  this.extractDataInternal(JSON.stringify(res));
    //});

    this.extractDataInternal(url);
    
    //'James 9823456567 paid on 25/12/2020 and 1,234.23 to ganesh@email.com'
    
  }

  private extractDataInternal(url: string){
    this.sendGetRequest(url).subscribe(
      res => {
        console.log('RESP IS '+JSON.stringify(res));
        var emails = res[0];        
        var dates = res[1];        
        var names = res[2];
        var mobiles = res[3];

        emails.forEach(elem => this.foods.push({value: elem, viewValue: elem}));  
        dates.forEach(elem => this.foods.push({value: elem, viewValue: elem}));  
        names.forEach(elem => this.foods.push({value: elem, viewValue: elem}));  
        mobiles.forEach(elem => this.foods.push({value: elem, viewValue: elem}));  

      });
  }

  ngOnInit() {
    console.log('from ngInit GG ');
  }

  private sendGetRequest(url: any): Observable<any> {
     return this.httpClient.get<any>(this.SERVER_URL+'?myurl='+url);
  }

}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */