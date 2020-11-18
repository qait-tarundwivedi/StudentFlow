declare var require: any
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { PolicyService } from 'src/app/policy.service';
import { Policy } from 'src/app/policy.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('Cengage') RootCengage: ElementRef;


   public onlyitems: any;
   public onlyitems2 = [];
   public submitted = false;
   public DBData;

  constructor(private db: PolicyService, dbMain: AngularFireDatabase) {
    // dbMain.list('/').valueChanges().subscribe((data) => {
    //   // this.onlyitems =   data;
    //   // console.log(data)
    // });
  }

  async ngOnInit(): Promise<void> {
    await this.retrieveTutorials();
  }
  async retrieveTutorials(): Promise<void> {
    await this.db.getAll().valueChanges().subscribe(data2 => {
      // console.log('.--->'+JSON.stringify(data2+'', null, 2));
      this.onlyitems2 = data2;
      data2.map(function (val, index) {
        // console.log("key : ", index, "value : ", val);
         this.DBData =  JSON.parse(JSON.stringify(val));
        console.log(JSON.parse(JSON.stringify(val)));
      })
    });
    await setTimeout(() => { console.log(this.onlyitems2); }, 3000);
  }
  // [ngClass]="{'label ': true, 'pass': pass, 'fail': !pass}

  ngAfterViewInit() {
    console.log('.--->'+this.RootCengage.nativeElement.id);
  }
  setClasses() {
    // console.log('.--->'+this.RootCengage.nativeElement.id);
    return {
      label: true,
      pass: this.pass,
      fail: !this.pass,
    }
  }


  title = 'my-app-angular';
  public pass = true;


}
