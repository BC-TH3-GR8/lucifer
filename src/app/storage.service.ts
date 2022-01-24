import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(public storage: Storage) {
    console.log('Your storage provider is working here !');
  }

  public async addUser(value: any): Promise<any> {
    try {
      if (await this.checkUser(value)) {
        return false;
      }
      const userID = await this.getAllUsers();
      let ID;
      let userIdobj = [];
      if (userID) {
        userIdobj = JSON.parse(userID);
        userIdobj.push(value);
      } else {
        userIdobj = [value];
      }
      const result = await this.set('userId', JSON.stringify(userIdobj));
      //console.log('set string in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }

  async checkUser(value: string): Promise<any> {
    try {
      const userID = await this.getAllUsers();
      if (userID) {
        const userIdobj = JSON.parse(userID);
        if (userIdobj.find((_) => _ === value)) {
          console.log('duplicate entry');
          return true;
        }
      }
      return false;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  async getAllUsers(): Promise<any> {
    try {
      const result = await this.storage.get('userId');
      //console.log('storageGET: userId : ' + result);
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  public async addUserDetails(value: any): Promise<any> {
    try {
      const result = await this.get('userId');
      const resObj = JSON.parse(result);
      if (resObj.find) {
        //console.log('set string in storage: ' + result);
      }
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }

  public async getUserDetails(key: any): Promise<any> {
    try {
      const result = await this.storage.get(key);
      //console.log('storageGET: userId : ' + result);
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  public async setLoggedInUserDetails(value: any) {
    try {
      const result = await this.set('loggedInUserDetails', value);
     // console.log('set string in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }

  public clearLogInUserDetails(){
    return this.setLoggedInUserDetails('');
  }

  public async getLoggedInUserDetails() {
    try {
      const result = await this.storage.get('loggedInUserDetails');
      //console.log('storageGET: userId : ' + result);
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  // set a key/value
  async set(key: string, value: any): Promise<any> {
    try {
      const result = await this.storage.set(key, value);
      //console.log('set string in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }
  // to get a key/value pair
  async get(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      //console.log('storageGET: ' + key + ': ' + result);
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }
  // set a key/value object
  async setObject(key: string, object: object) {
    try {
      const result = await this.storage.set(key, JSON.stringify(object));
      console.log('set Object in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }
  // get a key/value object
  async getObject(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      if (result != null) {
        return JSON.parse(result);
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }
  // remove a single key value:
  remove(key: string) {
    this.storage.remove(key);
  }
  //  delete all data from your application:
  clear() {
    this.storage.clear();
  }
}
