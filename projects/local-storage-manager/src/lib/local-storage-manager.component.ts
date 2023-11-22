import {Component, inject, Inject, OnInit} from '@angular/core';
import {LocalStorageManagerService} from "./local-storage-manager.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'lib-local-storage-manager',
  template: `
    <div class="card">
      <h4 class="card-header">Login</h4>
      <div class="card-body">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input type="text" formControlName="username" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" formControlName="password" class="form-control" />
          </div>
          <div>
            <button class="btn btn-primary">
              <span class="spinner-border spinner-border-sm me-1"></span>
              Login
            </button>
            <a routerLink="../register" class="btn btn-link">Register</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class LocalStorageManagerComponent implements OnInit {
  form!: FormGroup;
  user: any = {};

  private readonly formBuilder = inject(FormBuilder);
  private readonly storageService = inject(LocalStorageManagerService);

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.user = this.storageService.getItem('item', 'localStorage');
  }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log(this.f["username"].value)
  }
}
