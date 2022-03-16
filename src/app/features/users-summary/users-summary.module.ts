import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersSummaryRoutingModule } from './users-summary-routing.module';
import { UsersSummaryComponent } from './users-summary.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [UsersSummaryComponent, CreateUserComponent],
  imports: [
    UsersSummaryRoutingModule,
    CommonModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UsersSummaryModule { }
