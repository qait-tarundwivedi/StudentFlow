import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-time',
  template: `<span class="time" >Time of Execution:  {{time}}</span>`,
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  timeDetails: any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

   const headers =  new  HttpHeaders()
   .set('Access-Control-Allow-Origin', '*')
   .set('Access-Control-Allow-Origin','http://localhost:4200/')
   .set('Access-Control-Allow-Credentials','true')
   ;
     this.http.get(this.baseURL+'/job/CAPS/job/CAPS_Student_Launch_MindTap_From_Dashboard_PROD/lastBuild/api/json' ,{headers }).subscribe(data => {
       this.timeDetails = data;
       console.log(this.timeDetails);
      
   }) 
  }
  baseURL = 'https://jenkins-qa-automation.cengage.info/'
  public time = 'Tuesday 24th November 2020'

}
