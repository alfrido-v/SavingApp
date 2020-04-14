import { Component, OnInit } from '@angular/core';
import { SavingService } from '../service/saving.service';
import { Saving } from '../model/saving.model';

@Component({
  selector: 'app-saving-list',
  templateUrl: './saving-list.component.html',
  styleUrls: ['./saving-list.component.css']
})
export class SavingListComponent implements OnInit {

  // to show/hide update button
  toogleUpdateButton = false;

  // to show/hode search button
  toogleSearchButton = true;

  // declare saving object - type : Saving
  saving: Saving = new Saving();
  
  // array of saving
  savings: Saving[];

  constructor(private savingService: SavingService) { }

  // initiate getSaving()
  ngOnInit() {
    this.getSaving();
  }

  getSaving() {
    // call getSaving() from service
    this.savingService.getSaving().subscribe(data => {
      this.savings = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Saving;
      });
    });
  }

  addSaving(saving: Saving) {
    // call addSaving() from service
    return this.savingService.addSaving(saving);
  }

  updateSaving(saving: Saving) {
    // call updateSaving() from service
    return this.savingService.updateSaving(saving);
    // after update, hide updateButton and show submit button
    this.toogleUpdateButton = false;
    // clear this.saving object
    this.saving =  new Saving();
  }

  deleteSaving(savingId: string) {
    this.savingService.deleteSaving(savingId);
  }

  editFunction(saving: Saving) {
    // set saving detail to form fields
    this.saving = saving;
    // show update button and hide submit button
    this.toogleUpdateButton = true;
  }

  searchSaving(saving: Saving) {
    // method to search existing data saving in firestore
    this.savingService.searchSaving(saving).subscribe(data => {
      this.savings = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Saving;
      });
    });
  }

  clearSearch() {
    // clear list
    this.savings = [];
    // get all
    this.getSaving();
  }



}
