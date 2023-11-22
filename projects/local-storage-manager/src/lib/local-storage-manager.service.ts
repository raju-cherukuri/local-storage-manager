import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import * as CryptoJS from "crypto-js";

const USER_KEY = environment.USER_KEY;
const encryptSecretKey = environment.secretKey;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {
  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveItem(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    this.encryptPayload(user);
  }

  public getItem(): any {
    // @ts-ignore
    const user = this.decryptPayload(window.sessionStorage.getItem(USER_KEY));
    if (user) {
      return user;
    }
    return {};
  }

  // @ts-ignore
  private encryptPayload(plainText: string) {
    try {
      if (plainText) {
        window.sessionStorage.setItem(USER_KEY, CryptoJS.AES.encrypt(JSON.stringify(plainText), encryptSecretKey).toString());
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
