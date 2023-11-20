# local-storage-manager

The library is designed to provide a convenient and Angular-friendly way to manage local storage in Angular applications. It simplifies the process of storing, retrieving, and managing data in the browser's local storage.

![Static Badge](https://img.shields.io/badge/build-passing-brightgreen)
![GitHub Repo stars](https://img.shields.io/github/stars/raju/ngx-multilingual)

## Usage

### 1. Install

```
npm install local-storage-manager --save
npm install crypto-js
npm i ngx-toastr

```
###NOTE: Usage of ngx-toastr is optional. We have used it just to display alerts.

import `LocalStorageManagerService`。

```typescript
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {LocalStorageManagerService} from "@local-storage-manager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'custom-lsm-demo';
  form!: FormGroup;
  user: any;
  constructor(
    private readonly toastr: ToastrService,
    private readonly formBuilder: FormBuilder,
    private readonly storageService: LocalStorageManagerService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.user = this.storageService.getUser();
    if(this.user.username === undefined){
      this.toastr.warning("It seems local storage data has changed or is deleted")
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    let credentials = {username: this.f["username"].value}
    this.storageService.saveUser(credentials);
    this.toastr.success("Record Saved successfully")
    this.user = this.storageService.getUser();
  }

  showSuccess(message?: string) {
    this.toastr.success(message, 'Message');
  }

  showWarning(message?: string) {
    this.toastr.warning(message, 'Message');
  }

  showError(message?: string) {
    this.toastr.error(message, 'Message');
  }
}
```

### 2、Template

```html
 <div class="container">
  <div class="login-form">
    <div class="card">
      <h2 class="card-header">Login</h2>
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
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="card mt-2">
    <h2 class="card-header">USER</h2>
    <h3 class="m-2 p-2 text-primary">{{user.username}}</h3>
  </div>
</div>
```

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/raju/local-storage-manager/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/raju/local-storage-manager/blob/main/LICENSE) file for the full text)
