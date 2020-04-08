import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Saving } from 'src/app/model/saving.model';

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  constructor(private firestore: AngularFirestore) { }

  // add data to firestore
  addSaving(saving: Saving) {
    const savingObject = {...saving}; // convert object of type "saving" to JSON Object, because firestore understand JSON
    return this.firestore.collection('Saving').add(savingObject);
  }

  // fetched all data from firestore
  getSaving() {
    return this.firestore.collection('Saving').snapshotChanges();
  }

  // update data in firestore
  updateSaving(saving: Saving) {
    const savingObject = {...saving};
    this.firestore.collection('Saving/' + saving.id).update(savingObject);
  }

  // detele data from firestore depends on id
  deleteSaving(savingId: string) {
    this.firestore.doc('Saving/' + savingId).delete();
  }


}
