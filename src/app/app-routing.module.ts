import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SavingListComponent } from './saving-list/saving-list.component';


const routes: Routes = [
  {
    path: 'savings',
    component: SavingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
