import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudMethodsService {

  constructor(private firestore: AngularFirestore) { }

  getItems(basePath: string) {
    return this.firestore.collection(basePath).snapshotChanges();
  }

  createItem(basePath: string, value: any) {
    return this.firestore.collection(basePath).add(value);
  }

  updateItem(basePath: string, value: any, key: string) {
    this.firestore.doc(basePath + '/' + key).update(value);
  }

  deleteItem(basePath: string, key: string) {
    this.firestore.doc(basePath + '/' + key).delete();
  }
}
