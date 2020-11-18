import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Policy } from 'src/app/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private dbPath = '/';
  tutorialsRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {

    this.tutorialsRef = db.list(this.dbPath);
   }
   getAll(): AngularFireList<any> {
    return this.tutorialsRef;
  }
}
