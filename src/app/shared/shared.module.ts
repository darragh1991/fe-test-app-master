import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {

}
