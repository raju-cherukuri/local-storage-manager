import { NgModule } from '@angular/core';
import { LocalStorageManagerComponent } from './local-storage-manager.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    LocalStorageManagerComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    RouterLink
  ],
  exports: [
    LocalStorageManagerComponent
  ]
})
export class LocalStorageManagerModule { }
