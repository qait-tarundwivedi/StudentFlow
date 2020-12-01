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



  public onlyitems2: any;
  public submitted = false;
  public DBData: any;

  constructor(private db: PolicyService, private renderer: Renderer2, private elementRef: ElementRef) {

    // dbMain.list('/').valueChanges().subscribe((data) => {
    //   // this.onlyitems =   data;
    //   // console.log(data)
    // });
  }

  async ngOnInit() {
    await this.retrieveTutorials();
     console.log('........>' + JSON.parse(JSON.stringify(this.DBData)));
  }
  async retrieveTutorials() {
		return new Promise( (resolve, reject) => {
			this.db.getAll().valueChanges().subscribe(data2 => {
        this.onlyitems2 = data2;
        console.log('=>' + this.onlyitems2);
     //   this.DBData = JSON.parse(JSON.stringify(data2));
   //     this.check();
    //    resolve()
				data2.map((val, index) => {
					this.DBData = JSON.parse(JSON.stringify(val));
         console.log('=<' + JSON.parse(JSON.stringify(val+"")));
         this.check();
					resolve()
				})
			});
			// await setTimeout(() => { console.log(this.onlyitems2); }, 3000);
		})
	}


  async ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fafafa'
   // await setTimeout(() => { this.check() }, 3000);
  }
  async check() {
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('#wrapper span.label');
    elements.forEach(ele => console.log(ele.className));
    if (this.DBData !== undefined) {
      elements.forEach(ele => {
        for (let key in this.DBData) {
          if (key === ele.id) {
            if (ele.className!==this.DBData[key]) {
              ele.className = "label "+this.DBData[key]
            //  ele.classList.remove('fail');
            //  ele.classList.remove('pass');
           //   ele.classList.add(this.DBData[key])
            }
          }
        }
      })
    }
  }

  title = 'Student flow';
  public pass = true;
  


}
