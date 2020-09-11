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
  templateUrl: 'select-overview-example.html',
})
export class SelectOverviewExample {
  foods: Food[] = [];
  SERVER_URL = 'https://ganeshghag.pythonanywhere.com/';


  constructor(private httpClient: HttpClient) { 

  }

  fetchData(url: string): void {
    url = url.trim();
    if (!url) { return; }


      const headers1 = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
   
      this.httpClient.get(url,{headers: headers1, responseType:'text'}).subscribe((res)=>{
      console.log(res);
      this.extractDataInternal(JSON.stringify(res));
    });
    
    //'James 9823456567 paid on 25/12/2020 and 1,234.23 to ganesh@email.com'
    
  }

  private extractDataInternal(data: string){
    this.sendPostRequest(data).subscribe(
      res => {
        console.log('RESP IS '+JSON.stringify(res));
        var emails = res[0];        var mobiles = res[1];
        var dates = res[2];        var amounts = res[3];
        var names = res[4];
        console.log(this.foods);console.log(emails);console.log(mobiles);console.log(dates);console.log(amounts);console.log(names);
        emails.forEach(elem => this.foods.push({value: elem, viewValue: elem}));  
        mobiles.forEach(elem => this.foods.push({value: elem, viewValue: elem}));  
        dates.forEach(elem => this.foods.push({value: elem, viewValue: elem}));  
        //amounts.forEach(elem => this.foods.push({value: elem, viewValue: elem}));  
        names.forEach(elem => this.foods.push({value: elem, viewValue: elem}));  
      });
  }

  ngOnInit() {
    console.log('from ngInit GG ');

        //this.foods = res[0];
  }


  private sendPostRequest(data: any): Observable<any> {
     return this.httpClient.post<any>(this.SERVER_URL, data);
  }


}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */