import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import {
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule } from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {

}
