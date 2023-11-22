import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import * as CryptoJS from "crypto-js";

const encryptSecretKey = environment.secretKey;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {
  /***
   * In this method we can save the item on either local Storage or session Storage
   * @param item
   * @param key
   * @param storageType
   */
  public saveItem(item: any, key: string, storageType: string): void {
    if (storageType === 'localStorage') {
      window.localStorage.removeItem(key);
      this.deleteItem(key, storageType);
      this.encryptPayload(item, key, storageType);
    } else if (storageType === 'sessionStorage')  {
      this.deleteItem(key, storageType);
      this.encryptPayload(item, key, storageType);
    }
  }

  /***
   * You can delete an item using its key either on local storage or session storage.
   * @param key
   * @param storageType
   */
  public deleteItem(key: string, storageType: string): void {
    if (storageType === 'localStorage') {
      window.localStorage.removeItem(key);
    } else if (storageType === 'sessionStorage')  {
      window.sessionStorage.removeItem(key);
    }
  }

  /***
   * In this method, you can delete all items either on local storage or session storage.
   * @param storageType
   */
  public deleteAll(storageType: string): void {
    if (storageType === 'localStorage') {
      window.localStorage.clear();
    } else if (storageType === 'sessionStorage')  {
      window.sessionStorage.clear();
    }
  }

  /***
   * In this method, you can get an item using its key either from local storage or session storage.
   * @param key
   * @param storageType
   */
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
