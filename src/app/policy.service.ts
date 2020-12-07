import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PolicyService {
  public items: Observable<any[]>;
  private dbPath = '/';
  private exDetailsPath = '1cengageDB/';
  public tutorialsRef: AngularFireList<any> = null;

  constructor(public db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
    this.items = this.tutorialsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getAll(): AngularFireList<any> {
    return this.tutorialsRef;
  }

  getAllVaue(): void {
    this.db.list(this.dbPath).snapshotChanges();
  }

  getSingleVaue() {
   return this.db.list(this.exDetailsPath);
  }

  addItem(newName: string) {
    this.tutorialsRef.push({ text: newName });
  }
  updateBug(key: string, newText: string) {
    this.tutorialsRef.update(key, { bug: newText });
  }
  deleteItem(key: string) {
    this.tutorialsRef.remove(key);
  }
  deleteEverything() {
    this.tutorialsRef.remove();
  }



}
