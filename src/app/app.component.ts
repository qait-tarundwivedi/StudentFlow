import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { PolicyService } from 'src/app/policy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('Cengage') RootCengage: ElementRef;
  @ViewChild('cengage_student') cengage_student: ElementRef;
  @ViewChildren('eleBox') divs: QueryList<any>;



  public onlyitems: any;
  public onlyitems2 = [];
  public submitted = false;
  public DBData;
  serializedPanes: string = '';

  constructor(private db: PolicyService, private renderer: Renderer2, private elementRef: ElementRef) {

    // dbMain.list('/').valueChanges().subscribe((data) => {
    //   // this.onlyitems =   data;
    //   // console.log(data)
    // });
    // this.retrieveTutorials();
  }

  async ngOnInit() {
    await this.retrieveTutorials();
    await console.log('........>' + this.DBData);
  }
  async retrieveTutorials() {
    return await this.db.getAll().valueChanges().subscribe(data2 => {
      // console.log('.--->'+JSON.stringify(data2+'', null, 2));
      this.onlyitems2 = data2;
      data2.map((val, index) => {
        // console.log("key : ", index, "value : ", val);
        this.DBData = JSON.parse(JSON.stringify(val));
        console.log(JSON.parse(JSON.stringify(val)));
      })
    });
    // await setTimeout(() => { console.log(this.onlyitems2); }, 3000);
  }


  async ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fafafa'
    //  await this.renderer.addClass(this.RootCengage.nativeElement, 'pass');
    // await this.renderer.addClass(this.cengage_student.nativeElement, 'pass');
    await console.log('.--->' + this.DBData)

    await this.divs.forEach(div => console.log(div));
    await setTimeout(() => { this.check() }, 3000);
  }
  //   console.log ('key: ' +  key + ',  value: ' + this.DBData[key]);
  async check() {
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('#wrapper span.label');
    console.log(elements);
    elements.forEach(ele => console.log(ele.classList));
    if (this.DBData !== undefined) {
      elements.forEach(ele => {
        for (let key in this.DBData) {
          if (key === ele.id) {
            ele.classList.add(this.DBData[key])
            //  this.renderer.addClass(this.RootCengage.nativeElement, this.DBData[key]);
          }
        }
      })
    }
  }


  setClasses() {
    // console.log('.--->'+this.RootCengage.nativeElement.id);
    return {
      label: true,
      pass: this.pass,
      fail: !this.pass,
    }
  }


  title = 'Student flow';
  public pass = true;


}
