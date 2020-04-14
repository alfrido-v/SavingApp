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
    saving.dateCreatedTimestamp = new Date(saving.dateCreated);
    const savingObject = {...saving}; // convert object of type "saving" to JSON Object, because firestore understand JSON
    return this.firestore.collection('Saving').add(savingObject);
  }

  // fetched all data from firestore
  getSaving() {
    return this.firestore.collection('Saving').snapshotChanges();
  }

  // update data in firestore
  updateSaving(saving: Saving) {
    saving.dateCreatedTimestamp = new Date(saving.dateCreated);
    saving.lastUpdated =  new Date();
    const savingObject = {...saving};
    this.firestore.doc('Saving/' + saving.id).update(savingObject);
  }

  // detele data from firestore depends on id
  deleteSaving(savingId: string) {
    this.firestore.doc('Saving/' + savingId).delete();
  }

  searchSaving(saving: Saving){
    //searching method with given result from all parameters
    return this.firestore.collection(
      'Saving', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

        //the searching conditions
        if (saving.name){
          query = query.orderBy('name', 'asc').startAt('A');
        }
        if (saving.info){
          query = query.where('info', '==', saving.info);
        }
        if (saving.saving){
          query = query.where('saving', '>=', saving.saving); //search saving with greater or equal amount
        }
        if (saving.dateCreated){
          //convert date string to date object
          saving.dateCreatedTimestamp = new Date(saving.dateCreated);
          query = query.where('dateCreatedTimestamp', '==', saving.dateCreated);
        }
        return query;
      }).snapshotChanges();
  }


}
