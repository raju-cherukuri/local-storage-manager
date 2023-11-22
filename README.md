# ngx-local-storage-manager

The library is designed to provide a convenient and Angular-friendly way to manage local storage in Angular applications.
It simplifies the process of storing, retrieving, and managing data in the browser's local storage.

#### NOTE:  You can store data on both local Storage and session Storage on your browser.

![Static Badge](https://img.shields.io/badge/build-passing-brightgreen)
![GitHub Repo stars](https://img.shields.io/github/stars/raju/ngx-multilingual)

## Usage

### 1. Install

```
npm i ngx-local-storage-manager --save
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

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getUser();
    if(this.user.username === undefined){
      this.toastr.warning("It seems local storage data has changed or is deleted")
    }
  }

  get f() { return this.form.controls; }

  getUser(){
    this.user = this.storageService.getItem('item', 'sessionStorage');
  }
  onSubmit() {
    let credentials = {username: this.f["username"].value}
    console.log(credentials)
    this.storageService.saveItem(credentials, 'item', 'sessionStorage');
    this.toastr.success("Record Saved successfully")
    this.getUser();
  }

  deleteItem() {
    this.storageService.deleteAll('sessionStorage');
    this.getUser();
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
              <span class=" me-1"></span>
              Login
            </button>
          </div>
        </form>
        <button class="btn btn-danger" (click)="deleteItem()">
          <span class="me-1"></span>
          Delete User
        </button>
      </div>
    </div>
  </div>
  <div class="card mt-2">
    <h2 class="card-header">USER</h2>
    <h3 class="m-2 p-2 text-primary">{{user.username}}</h3>
  </div>
</div>
```

### All Methods from LocalStorageManagerService
1. saveItem(user: any, key: string, storageType: string)
2. deleteItem(key: string, storageType: string)
3. deleteAll(storageType: string)
4. getItem(key: string, storageType: string)



## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/raju/local-storage-manager/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/raju/local-storage-manager/blob/main/LICENSE) file for the full text)
