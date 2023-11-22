import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import * as CryptoJS from "crypto-js";

const encryptSecretKey = environment.secretKey;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {
  public saveItem(user: any, key: string, storageType: string): void {
    if (storageType === 'localStorage') {
      window.localStorage.removeItem(key);
      this.deleteItem(key, storageType);
      this.encryptPayload(user, key, storageType);
    } else if (storageType === 'sessionStorage')  {
      this.deleteItem(key, storageType);
      this.encryptPayload(user, key, storageType);
    }
  }

  public deleteItem(key: string, storageType: string): void {
    if (storageType === 'localStorage') {
      window.localStorage.removeItem(key);
    } else if (storageType === 'sessionStorage')  {
      window.sessionStorage.removeItem(key);
    }
  }

  public deleteAll(storageType: string): void {
    if (storageType === 'localStorage') {
      window.localStorage.clear();
    } else if (storageType === 'sessionStorage')  {
      window.sessionStorage.clear();
    }
  }

  public getItem(key: string, storageType: string): any {
    let user;
    if (storageType === 'localStorage') {
      // @ts-ignore
      user = this.decryptPayload(window.localStorage.getItem(key));
    } else if (storageType === 'sessionStorage')  {
      // @ts-ignore
      user = this.decryptPayload(window.sessionStorage.getItem(key));
    }
    if (user) {
      return user;
    }
    return {};
  }

  // @ts-ignore
  private encryptPayload(plainText: string, key: string, storageType: string) {
    try {
      if (plainText) {
        if (storageType === 'localStorage') {
          window.localStorage.setItem(key, CryptoJS.AES.encrypt(JSON.stringify(plainText), encryptSecretKey).toString());
        } else if (storageType === 'sessionStorage')  {
          window.sessionStorage.setItem(key, CryptoJS.AES.encrypt(JSON.stringify(plainText), encryptSecretKey).toString());
        }
        return CryptoJS.AES.encrypt(JSON.stringify(plainText), encryptSecretKey).toString();
      }
    } catch (e) {
      console.log(e);
    }
  }

  private decryptPayload(encryptedPayload: string) {
    try {
      if (encryptedPayload) {
        const bytes = CryptoJS.AES.decrypt(encryptedPayload, encryptSecretKey);
        if (bytes.toString()) {
          return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return encryptedPayload;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
