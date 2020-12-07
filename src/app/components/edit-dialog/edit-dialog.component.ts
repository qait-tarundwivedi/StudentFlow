import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { PolicyService } from 'src/app/policy.service';
import { FormControl } from '@angular/forms';
import { filter, first, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  bug: any;
  currentElementId: any;
  items: any;
  data: any;
  public getBug: String = "Bug List";

  constructor(private matDialog: MatDialog,
    private db: PolicyService,
  ) { }

  ngOnInit(): void {
    this.getDetailsFromDB();
  }


  async openDialog() {
    return new Promise((resolve, reject) => {
      const dialogRef = this.matDialog.open(DialogComponent, {
        height: 'auto',
        width: 'auto',
        data: { name: this.bug }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed ' + result);
        this.bug = result;
        this.updateValue(this.currentElementId, result)
        this.getBugDetails(this.currentElementId)
        resolve()
      });
    })
  }

  getDetailsFromDB() {
    this.items = this.db.tutorialsRef.snapshotChanges().pipe(
      map(changes =>
        changes.filter(x => x.key === "1cengageDB").
          map(c => ({
            val: c.payload.val(),
            key: c.payload.key,
            ...c.payload.val()
          }))
      )
    );
  }
  getBugDetails(eleID) {
    this.items.subscribe(x => {
      console.error(JSON.parse(JSON.stringify(x[0])));
      const filterValue = JSON.parse(JSON.stringify(x[0]));
      this.getBug = filterValue[eleID].bug;
      console.warn('........>' + this.getBug)
    })
  }
  message= this.getBug

  getID($event) {
    //   let elementId: string = (event.target as Element).id;
    // console.log(elementId)
    this.currentElementId = <Element>$event.target.closest('.label.fail').id;
  }
  async updateValue(ele, bugID) {
    await this.db.updateBug('/1cengageDB/' + ele, bugID)
  }

}
