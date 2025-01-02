"use client";

export class LocalStorageService<T> {
  setLocalStorage(resource: T, key: string) {
    localStorage.setItem(key, JSON.stringify(resource));
  }

  removeLocalstorage(key: string) {
    localStorage.removeItem(key);
  }

  getLocalStorage(key: string) {  
    try {
      const local = localStorage.getItem(key) as string;
      return JSON.parse(local) as T;
    } catch (error: any){
      return error.message
    }
  }
}

export const localStorageService = new LocalStorageService();
