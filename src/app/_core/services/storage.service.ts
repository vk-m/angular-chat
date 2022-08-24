import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setLocalItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string): any {
    let item = JSON.parse(localStorage.getItem(key)!);
    return item;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
