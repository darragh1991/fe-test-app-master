import { CreateUserComponent } from './create-user/create-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersSummaryComponent } from './users-summary.component';

const routes: Routes = [{ path: '', component: UsersSummaryComponent}, {path: 'create', component: CreateUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersSummaryRoutingModule { }
