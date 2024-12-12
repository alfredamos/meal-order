"use client"

export class LocalStorageService<T>{
  setLocalStorage(resource: T, key: string){
    window.localStorage.setItem(key, JSON.stringify(resource))
  }

  removeLocalstorage(key: string){
    window.localStorage.removeItem(key);
  }

  getLocalStorage(key: string){
     const local = window.localStorage.getItem(key) as string;
     return JSON.parse(local) as T
  }
}

export const localStorageService = new LocalStorageService()